import { Patient } from './';
import { MongoClient } from 'mongodb';

export const dbAddPatient = (myPatient: Patient) : Promise<any>  => {
    return new Promise ((resolve, reject) => {
        MongoClient.connect('mongodb://localhost/test', (error, db) => {
            if (error) {
                db.close();
                reject(error);
            }
            const obj = myPatient.toJSON();
            db.collection('patient').insert(obj, null, (error, res) => {
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

export const dbGetPatients = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://localhost/test', (error, db) => {
            if (error) {
                db.close();
                reject(error);
            }
            db.collection('patient').find().toArray((error, res) => {
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
