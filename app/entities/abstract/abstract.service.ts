import { AbstractJSON, AbstractModel } from './';
import { MongoClient } from 'mongodb';
import { ObjectID } from 'bson';
import { URLMONGODB } from '../../shared';

export abstract class AbstractService {

    abstract getRecords();

    abstract getRecord(_id: string);

    abstract deleteRecord(_id: string);

    abstract insertOrUpdate(myEntity: AbstractModel);

    private promiseConnectToMongo(callback: (db: any, reject: any, resolve: any)
        => void): Promise<any> {
        return new Promise ((resolve, reject) => {
            MongoClient.connect(URLMONGODB, (error, db) => {
                if (error) {
                    // Do not try to close db, if MongoDB is shutdown, db is
                    // null
                    reject(error);
                } else {
                    callback(db, resolve, reject);
                }
            });
        });
    }

    private ifMongoConnected(db, err, res, resolve, reject) {
        if (err) {
            db.close();
            console.error(err);
            reject(err);
        } else {
            db.close();
            resolve(res);
        }
    }

    protected getRecordsNested(tableName: string): Promise<any> {
        return this.promiseConnectToMongo(
            (db, resolve, reject) => {
                db.collection(tableName).find().toArray((err, res) => {
                    this.ifMongoConnected(db, err, res, resolve, reject);
                })
            });
    }

    protected getRecordNested(tableName: string, id: string): Promise<any> {
        return this.promiseConnectToMongo(
            (db, resolve, reject) => {
                db.collection(tableName)
                    .findOne({_id: id}, {}, ((err, res) => {
                        this.ifMongoConnected(db, err, res, resolve, reject);
                    }));
            });
    }

    protected deleteRecordNested(tableName: string, id: string): Promise<any> {
        return this.promiseConnectToMongo(
            (db, resolve, reject) => {
                db.collection(tableName)
                    .deleteOne({_id: id}, null, ((err, res) => {
                        this.ifMongoConnected(db, err, res, resolve, reject);
                    }));
            });
    }

    protected insertOrUpdateNested(tableName: string, abstractModel:
        AbstractModel): Promise<any> {
            return this.promiseConnectToMongo(
                (db, resolve, reject) => {
                    if (!abstractModel.id) {
                        // tslint:disable-next-line
                        // https://stackoverflow.com/questions/10593337/is-there-any-way-to-create-mongodb-like-id-strings-without-mongodb
                        // delete abstractModel._id
                        abstractModel.id = new ObjectID();
                    }
                    const obj: AbstractJSON = abstractModel.toJSON();
                    // tslint:disable-next-line
                    // Actually res.result is an object with the form:
                    // tslint:disable-next-line
                    // {"n":1,"nModified":0,"upserted":[{"index":0,"_id":"5a687f8135f4c2753810c293"}],"ok":1}
                    // or {"n":1,"nModified":1,"ok":1}
                    // or {"n":1,"ok":1} (if abstractModel._id
                    // is undefined thanks to `delete abstractModel._id'
                    // below)
                    // See documentation at:
                    // tslint:disable-next-line
                    // https://docs.mongodb.com/manual/reference/method/db.collection.save/
                    // TODO save is DEPRECATED.
                    // tslint:disable-next-line
                    // See http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#save
                    // Or more examples at mongodb client documentation 2.2
                    // tslint:disable-next-line
                    // http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#save
                    db.collection(tableName).save(obj, null, (err, res) => {
                        if (err) {
                            db.close();
                            console.error(err);
                            reject(err);
                        } else {
                            if (res.result.nModified === 1) {
                                console.log(`${tableName} updated`);
                                console.log(`result: ${res}`);
                                db.close();
                                resolve(true);
                            } else {
                                console.log(`${tableName} inserted`);
                                console.log(`result: ${res}`);
                                db.close();
                                resolve(false);
                            }
                        }
                    });
                }
            );
    }

}
