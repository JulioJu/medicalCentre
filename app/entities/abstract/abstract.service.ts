import { AbstractJSON, AbstractModel } from './';
import { MongoClient } from 'mongodb';

export abstract class AbstractService {

    addEntity(abstractModel: AbstractModel, tableName: string): Promise<any> {
        return new Promise ((resolve, reject) => {
            MongoClient.connect('mongodb://localhost/test', (error, db) => {
                if (error) {
                    db.close();
                    reject(error);
                }
                const obj: AbstractJSON = abstractModel.toJSON();
                db.collection(tableName).insert(obj, null, (error, res) => {
                    if (error) {
                        db.close();
                        reject(error);
                    }
                    else {
                        db.close();
                        resolve();
                    }
                });
            });
        });
    }

    getEntity(tableName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            MongoClient.connect('mongodb://localhost/test', (error, db) => {
                if (error) {
                    db.close();
                    reject(error);
                }
                db.collection(tableName).find().toArray((error, res) => {
                    if (error) {
                        db.close();
                        reject(error);
                    }
                    else {
                        db.close();
                        resolve(res);
                    }
                })
            });
        });
    }

}

