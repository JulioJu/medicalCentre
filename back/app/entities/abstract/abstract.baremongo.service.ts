import { testId, checkCollection, IAbstractService, AbstractModel } from './';
import { IAbstract } from '../entities-interface';
import { MongoClient, Db, MongoError ,
    DeleteWriteOpResultObject } from 'mongodb';
import { ObjectID } from 'bson';
// FIX circular dependencies. See ../../../AnotherCircularDependenciesError
import { URLMONGODB, MONGO_DB_NAME } from '../../utils/const';

const promiseConnectToMongo = async (callback: (mongoClient: MongoClient,
            resolve: (val?: any) =>
        void, reject: (err?: any) => void)
    => void): Promise<any> =>
    new Promise<any>((resolve, reject) => {
        MongoClient.connect(URLMONGODB, (error, mongoClient) => {
            if (error) {
                // Do not try to close mongoClient, if MongoDB is shutdown,
                // mongoClient is null
                reject(error);
            } else {
                callback(mongoClient, resolve, reject);
            }
        });
    });

const ifMongoConnected = (mongoClient: MongoClient,
        err: MongoError, res: any[] |
    DeleteWriteOpResultObject, resolve: (val?: any) => any, reject: (err?:
        any) => any): void => {
    if (err) {
        mongoClient.close()
            .catch((e: any) => {
                console.error(e);
                reject(e);
            });
        console.error(JSON.stringify(err));
        reject(err);
    } else {
        mongoClient.close()
            .catch((e: any) => {
                console.error(e);
                reject(e);
            });
        resolve(res);
    }
};

export const AbstractBaremongoService: IAbstractService = {

    collection: undefined,

    async getRecords(): Promise<any> {
        return promiseConnectToMongo(
            (mongoClient, resolve, reject) => {
                const thisCollection = checkCollection(this.collection);
                const db: Db = mongoClient.db(MONGO_DB_NAME);
                db.collection(thisCollection)
                    .find()
                    .toArray((err, res) => {
                    ifMongoConnected(mongoClient, err, res, resolve, reject);
                });
            });
    },

    async getRecord(id: string): Promise<any> {
        return promiseConnectToMongo(
            (mongoClient, resolve, reject) => {
                testId(id, reject);
                const thisCollection = checkCollection(this.collection);
                const db: Db = mongoClient.db(MONGO_DB_NAME);
                db.collection(thisCollection)
                    .findOne({_id: id}, {}, ((err, res) => {
                        ifMongoConnected(mongoClient,
                            err, res, resolve, reject);
                    }));
            });
    },

    async deleteRecord(id: string): Promise<any> {
        return promiseConnectToMongo(
            (mongoClient, resolve, reject) => {
                testId(id, reject);
                const thisCollection = checkCollection(this.collection);
                const db: Db = mongoClient.db(MONGO_DB_NAME);
                db.collection(thisCollection)
                    .deleteOne({_id: id}, ((err, res) => {
                        ifMongoConnected(mongoClient,
                            err, res, resolve, reject);
                    }));
            });
    },

    async insertOrUpdate(abstractModel: AbstractModel): Promise<any> {
            return promiseConnectToMongo(
                (mongoClient, resolve, reject) => {
                    if (!abstractModel.id) {
                        // tslint:disable-next-line
                        // https://stackoverflow.com/questions/10593337/is-there-any-way-to-create-mongodb-like-id-strings-without-mongodb
                        abstractModel.id = new ObjectID().toHexString();
                    }
                    const obj: IAbstract = abstractModel.toJSON();
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
                    const db: Db = mongoClient.db(MONGO_DB_NAME);
                    db.collection(thisCollection)
                    // tslint:disable:deprecation
                        .save(obj, (err, res) => {
                            if (err) {
                                mongoClient.close()
                                    .catch((e: any) => {
                                        console.error(e);
                                        reject(e);
                                    });
                                console.error(JSON.stringify(err));
                                reject(err);
                            } else {
                                if (res.result.nModified === 1) {
                                    console.log(`${this.collection} updated`);
                                    console.log(`result: ${res}`);
                                    mongoClient.close()
                                        .catch((e: any) => {
                                            console.error(e);
                                            reject(e);
                                        });
                                    resolve({
                                        isUpdate: true,
                                        entity: res
                                    });
                                } else {
                                    console.log(`${this.collection} inserted`);
                                    console.log(`result: ${res}`);
                                    mongoClient.close()
                                        .catch((e: any) => {
                                            console.error(e);
                                            reject(e);
                                        });
                                    resolve({
                                        isUpdate: false,
                                        entity: res
                                    });
                                }
                            }
                        });
                }
            );
    }

};
