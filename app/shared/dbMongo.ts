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
