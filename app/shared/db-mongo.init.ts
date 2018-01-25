import { MongoClient } from 'mongodb';
import { URLMONGODB } from './';

export const dbMongoInit = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line
        // See https://github.com/mongodb/node-mongodb-native/blob/3.0.0/lib/mongo_client.js
        MongoClient
            .connect(URLMONGODB, (error, db) => {
                if (error) {
                    console.error(`=== Message from Mongo server ===
                    ${error}
                    ===`);
                    console.debug(`rejected from dbMongo.ts.`);
                    // Do not close. If there is an error it could be because
                    // the MonboDB service isn't running, therefore it could
                    // not be closed.
                    // db.close();
                    reject();
                } else {
                    db.collection('patient')
                        .createIndex( { '_idSSN': 1 }, { unique: true } );
                    db.close();
                    resolve();
                }
            });
    });
}
