import { Nurse } from './';

let MongoClient = require('mongodb').MongoClient;

export let dbAddNurse = function (myNurse: Nurse) : Promise<any> {
    return new Promise ((resolve, reject) => {
        MongoClient.connect('mongodb://localhost/test', function(error, db){
            if (error) reject(error)
            let obj = myNurse.toJSON();
            db.collection('nurse').insert(obj, null, function(error, res){
                if (error) {
                    console.log('coucouFromError');
                    reject(error);
                }
                else {
                    console.log('coucouFromSucces');
                    resolve();
                }
            });
        });
    });
};

export let dbGetNurses = function (): Promise<any> {
    return new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://localhost/test', function(error, db){
            if (error) reject(error);
            db.collection('nurse').find().toArray(function (error, res) {
                if (error)
                    reject(error);
                else
                    resolve(res);
            })
        });
    });
};
