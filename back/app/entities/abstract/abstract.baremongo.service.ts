import { testId, checkCollection, AbstractService, AbstractModel } from './';
import { AbstractInterface } from '../entities-interface';
import { MongoClient, Db, MongoError ,
    DeleteWriteOpResultObject } from 'mongodb';
import { ObjectID } from 'bson';
// FIX circular dependencies. See ../../../AnotherCircularDependenciesError
import { URLMONGODB } from '../../utils/const';

const promiseConnectToMongo = async (callback: (db: Db, resolve: (val?: any) =>
        void, reject: (err?: any) => void)
    => void): Promise<any> =>
    new Promise ((resolve, reject) => {
        MongoClient.connect(URLMONGODB, (error, db) => {
            if (error) {
                // Do not try to close db, if MongoDB is shutdown, db is null
                reject(error);
            } else {
                callback(db, resolve, reject);
            }
        });
    });

const ifMongoConnected = (db: Db, err: MongoError, res: any[] |
    DeleteWriteOpResultObject, resolve: (val?: any) => any, reject: (err?:
        any) => any): void => {
    if (err) {
        db.close();
        console.error(err);
        reject(err);
    } else {
        db.close();
        resolve(res);
    }
};

export const AbstractBaremongoService: AbstractService = {

    collection: undefined,

    async getRecords(): Promise<any> {
        return promiseConnectToMongo(
            (db, resolve, reject) => {
                const thisCollection = checkCollection(this.collection);
                db.collection(thisCollection)
                    .find()
                    .toArray((err, res) => {
                    ifMongoConnected(db, err, res, resolve, reject);
                });
            });
    },

    async getRecord(id: string): Promise<any> {
        return promiseConnectToMongo(
            (db, resolve, reject) => {
                testId(id, reject);
                const thisCollection = checkCollection(this.collection);
                db.collection(thisCollection)
                    .findOne({_id: id}, {}, ((err, res) => {
                        ifMongoConnected(db, err, res, resolve, reject);
                    }));
            });
    },

    async deleteRecord(id: string): Promise<any> {
        return promiseConnectToMongo(
            (db, resolve, reject) => {
                testId(id, reject);
                const thisCollection = checkCollection(this.collection);
                db.collection(thisCollection)
                    .deleteOne({_id: id}, ((err, res) => {
                        ifMongoConnected(db, err, res, resolve, reject);
                    }));
            });
    },

    async insertOrUpdate(abstractModel: AbstractModel): Promise<any> {
            return promiseConnectToMongo(
                (db, resolve, reject) => {
                    if (!abstractModel.id) {
                        // tslint:disable-next-line
                        // https://stackoverflow.com/questions/10593337/is-there-any-way-to-create-mongodb-like-id-strings-without-mongodb
                        abstractModel.id = new ObjectID().toHexString();
                    }
                    const obj: AbstractInterface = abstractModel.toJSON();
                    // Actually res.result is an object with the form:
                    // tslint:disable-next-line
                    // {"n":1,"nModified":0,"upserted":[{"index":0,"_id":"5a687f8135f4c2753810c293"}],"ok":1}
                    // or {"n":1,"nModified":1,"ok":1}
                    // or {"n":1,"ok":1} (if abstractModel._id
                    // is undefined thanks to `delete abstractModel._id'
                    // below)
                    // See documentation at:
                    // https://docs.mongodb.com/manual/reference/method/db.collection.save/
                    // TODO save is DEPRECATED.
                    // See http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#save
                    // Or more examples at mongodb client documentation 2.2
                    // http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#save
                    const thisCollection = checkCollection(this.collection);
                    db.collection(thisCollection)
                    // tslint:disable:deprecation
                        .save(obj, (err, res) => {
                            if (err) {
                                db.close();
                                console.error(err);
                                reject(err);
                            } else {
                                if (res.result.nModified === 1) {
                                    console.log(`${this.collection} updated`);
                                    console.log(`result: ${res}`);
                                    db.close();
                                    resolve(true);
                                } else {
                                    console.log(`${this.collection} inserted`);
                                    console.log(`result: ${res}`);
                                    db.close();
                                    resolve(false);
                                }
                            }
                        });
                }
            );
    }

};
