import { MongoClient, MongoError, Db } from 'mongodb';
import { URLMONGODB, MONGO_DB_NAME } from './';

export const dbMongoInit = async (): Promise<void> =>
    new Promise<void>((resolve, reject) => {
        MongoClient
            .connect(URLMONGODB, (error: MongoError,
                    mongoClient: MongoClient) => {
                if (error) {
                    console.error('=== Message from Mongo server ===\n'
                    + JSON.stringify(error)
                    + '\n===');
                    console.debug(`rejected from dbMongo.ts.`);
                    /* Do not close. If there is an error it could be because
                    * the MonboDB service isn't running, therefore it could
                    * not be closed.
                    * mongoClient.close();
                    */
                    reject();
                } else {
                    const db: Db = mongoClient.db(MONGO_DB_NAME);
                    db.collection('patient')
                        .createIndex({ _idSSN: 1 }, { unique: true })
                        .catch((e: any) => {
                            console.error(e);
                            reject(e);
                        });
                    mongoClient.close()
                        .catch((e: any) => {
                            console.error(e);
                            reject(e);
                        });
                    resolve();
                }
            });
    });
