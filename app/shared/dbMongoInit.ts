import { MongoClient } from 'mongodb';

export const dbMongoInit = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        // See
        // https://github.com/mongodb/node-mongodb-native/blob/3.0.0/lib/mongo_client.js
        MongoClient
            .connect('mongodb://localhost/test', (error, db) => {
                if (error) {
                    console.log("rejected from dbMongo.ts");
                    // console.log(error);
                    // Do not close. If there is an error it could be because
                    // the MonboDB service isn't running, therefore it could
                    // not be closed.
                    // db.close();
                    reject();
                }
                else {
                    db.collection('patient')
                        .createIndex( { "idSSN": 1 }, { unique: true } );
                    db.close();
                    resolve();
                }
            });
    });
}
