import { Patient } from './';

let MongoClient = require('mongodb').MongoClient;

const pseudoCondition = true;

const fakeMongoInnerPromise = () => {
    return new Promise((resolve, reject) => {
        if (pseudoCondition) {
            reject("Mongo est mort");
        }
        else {
            setTimeout(() => {
                console.log("n°4 coucou toujours exécuté from inner promise "
                    + "(fake MongoDb)");
                resolve("myReturnFromMongoDB");
            }, 3000); // 4
        }
    });
}

export let outerPromise = () => {
    return new Promise((resolve, reject) => {
        fakeMongoInnerPromise()
            .then((myVariable: string) => {
                // divers traitement sur la variable qu'on a récupéré en back.
                // Sinon cette promise sert à rien.
                // Traitement qui prennent du temps, éventuellement
                // Un super long : console.log
                console.log("n°5: on récupère la variable du fake fakeMongoInnerPromise " +
                    myVariable);
                resolve(myVariable);
            })
            .catch(
                (e: string)  => {
                    console.log('On est dans le catch de l\'outer promise: '
                        + e);
                    reject(e);
                }
            );
    });
}

export function nonnnnnPromise() {
    setTimeout(() => console.log('n°3 coucouNonPromise'), 2000); // 3
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
