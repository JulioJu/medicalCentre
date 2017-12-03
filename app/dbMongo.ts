import { Patient } from './entities/patient'
let MongoClient = require('mongodb').MongoClient;

export let dbMongoInit = function(): Promise<any> {
    return new Promise((resolve, reject) => {
        MongoClient
            .connect('mongodb://localhost/test', function(error, db){
                db.collection('patient')
                    .createIndex( { "idSSN": 1 }, { unique: true } );
                resolve();
            });
    });
}

export let dbAddPatient = function (myPatient: Patient) : Promise<any> {
    return new Promise ((resolve, reject) => {
        MongoClient.connect('mongodb://localhost/test', function(error, db){
            if (error) reject(error)
            let obj = myPatient.toJSON();
            db.collection('patient').insert(obj, null, function(error, res){
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

export let dbGetPatients = function (): Promise<any> {
    return new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://localhost/test', function(error, db){
            if (error) reject(error);
            db.collection('patient').find().toArray(function (error, res) {
                if (error)
                    reject(error);
                else
                    resolve(res);
            })
        });
    });
};
