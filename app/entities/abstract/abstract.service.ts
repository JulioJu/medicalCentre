import { AbstractJSON, AbstractModel } from './';
import { MongoClient } from 'mongodb';
import { URLMONGODB } from '../../shared';

export abstract class AbstractService {

    abstract insertOrUpdate(myEntity: AbstractModel);

    abstract getRecords();

    protected insertOrUpdateNested(abstractModel: AbstractModel, tableName:
        string): Promise<any> {
        return new Promise ((resolve, reject) => {
            MongoClient.connect(URLMONGODB, (error, db) => {
                if (error) {
                    db.close();
                    reject(error);
                }
                const obj: AbstractJSON = abstractModel.toJSON();
                db.collection(tableName).save(obj, null, (error, res) => {
                    if (error) {
                        db.close();
                        reject(error);
                    }
                    else {
                        if (res === 1) {
                            console.log(`${tableName} inserted`);
                            db.close();
                            resolve(true);
                        } else {
                            console.log(`${tableName} updated`);
                            db.close();
                            resolve(false);
                        }
                    }
                });
            });
        });
    }

    protected getRecordsNested(tableName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(URLMONGODB, (error, db) => {
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

