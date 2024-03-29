import { MongoClient, MongoError, Db } from 'mongodb';
import { URLMONGODB, MONGO_DB_NAME } from './';

export const dbMongoInit = async (): Promise<void> =>
    new Promise((resolve: (v: void) => void,
            reject: (e: Error) => void): void => {
        MongoClient
            .connect(URLMONGODB, {useNewUrlParser: true}, (error: MongoError,
                    mongoClient: MongoClient) => {
                if (error) {
                    console.error('=== Message from Mongo server ===\n'
                    + JSON.stringify(error)
                    + '\n===');
                    console.error(`rejected from dbMongo.ts.`);
                    /* Do not close. If there is an error it could be because
                    * the MonboDB service isn't running, therefore it could
                    * not be closed.
                    * mongoClient.close();
                    */
                    reject(error);
                } else {
                    const db: Db = mongoClient.db(MONGO_DB_NAME);
                    db.collection('patient')
                        .createIndex({ _idSSN: 1 }, { unique: true })
                        .then((value: string) => {
                            console.info('Dbmongo.init: created', value);
                        })
                        .catch((e: MongoError) => {
                            console.error(e);
                            reject(e);
                        });
                    mongoClient.close()
                        .then((value: void) => {
                            console.info('Dbmongo.init: closed');
                        })
                        .catch((e: MongoError) => {
                            console.error(e);
                            reject(e);
                        });
                    console.info('You are connected to ', URLMONGODB, '.');
                    resolve();
                }
            });
    });
