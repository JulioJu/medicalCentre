import { Nurse } from './';
import { MongoClient } from 'mongodb';

export const dbAddNurse = (myNurse: Nurse) : Promise<any>  => {
    return new Promise ((resolve, reject) => {
        MongoClient.connect('mongodb://localhost/test', (error, db) => {
            if (error) {
                db.close();
                reject(error);
            }
            const obj = myNurse.toJSON();
            db.collection('nurse').insert(obj, null, (error, res) => {
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
};

export const dbGetNurses = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://localhost/test', (error, db) => {
            if (error) {
                db.close();
                reject(error);
            }
            db.collection('nurse').find().toArray((error, res) => {
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
};
