import { MongoClient, MongoError, Db } from 'mongodb';
import { URLMONGODB } from './';

export const dbMongoInit = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        MongoClient
            .connect(URLMONGODB, (error: MongoError, db: Db) => {
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
                        .createIndex({ _idSSN: 1 }, { unique: true });
                    db.close();
                    resolve();
                }
            });
    });
}
