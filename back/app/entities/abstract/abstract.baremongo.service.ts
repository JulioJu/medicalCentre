import { MongoError, MongoClient, Db,
    FindAndModifyWriteOpResultObject, DeleteWriteOpResultObject }
    from 'mongodb';

import { testId, checkCollection, IAbstractService, AbstractModel } from './';
import { IAbstract } from '../entities-interface';
// FIX circular dependencies. See ../../../AnotherCircularDependenciesError
import { URLMONGODB, MONGO_DB_NAME } from '../../utils/const';

const promiseConnectToMongo = async (): Promise<MongoClient> =>
    new Promise((resolve: (mg: MongoClient) => void,
            reject: (err?: Error) => void): void => {
        MongoClient.connect(URLMONGODB,
                {useNewUrlParser: true},
                (error: MongoError, mongoClient: MongoClient) => {
            if (error) {
                // Do not try to close mongoClient, if MongoDB is shutdown,
                // mongoClient is null
                reject(error);
            } else {
                resolve(mongoClient);
            }
        });
    });

const closeMongo = (mongoClient: MongoClient): void => {
    mongoClient.close()
        .catch((e: MongoError) => {
            throw new Error(JSON.stringify(e));
        });
};

export const AbstractBaremongoService: IAbstractService = {

    collection: undefined,

    async getRecords(): Promise<IAbstract[]> {
        let mongoClient: MongoClient;
        try {
            mongoClient = await promiseConnectToMongo();
        } catch (error) {
            // type MongoError
            return Promise.reject(error);
        }
        const thisCollection = checkCollection(this.collection);
        const db: Db = mongoClient.db(MONGO_DB_NAME);
        try {
            return await db.collection(thisCollection)
                .find()
                .toArray();
        } catch (error) {
            return Promise.reject(error);
        } finally {
            closeMongo(mongoClient);
        }
    },

    async getRecord(id: string): Promise<IAbstract | null> {
        let mongoClient: MongoClient;
        try {
            testId(id);
            mongoClient = await promiseConnectToMongo();
        } catch (error) {
            // type MongoError
            return Promise.reject(error);
        }
        const thisCollection = checkCollection(this.collection);
        const db: Db = mongoClient.db(MONGO_DB_NAME);
        try {
            return await db.collection(thisCollection)
                .findOne({_id: id}, {});
        } catch (error) {
            // type MongoError
            return Promise.reject(error);
        } finally {
            closeMongo(mongoClient);
        }
    },

    async deleteRecord(id: string):
            Promise<DeleteWriteOpResultObject['result']> {
        let mongoClient: MongoClient;
        try {
            mongoClient = await promiseConnectToMongo();
        } catch (error) {
            return Promise.reject(error);
        }
        const thisCollection = checkCollection(this.collection);
        const db: Db = mongoClient.db(MONGO_DB_NAME);
        try {
            const res: DeleteWriteOpResultObject =
                await db.collection(thisCollection)
                    .deleteOne({_id: id});
            return res.result;
        } catch (error) {
            // type MongoError
            return Promise.reject(error);
        } finally {
            closeMongo(mongoClient);
        }
    },

    async insertOrUpdate(abstractModel: AbstractModel):
    Promise<FindAndModifyWriteOpResultObject<IAbstract>> {
        let mongoClient: MongoClient;
        try {
            mongoClient = await promiseConnectToMongo();
        } catch (error) {
            return Promise.reject(error);
        }
        const thisCollection = checkCollection(this.collection);
        const db: Db = mongoClient.db(MONGO_DB_NAME);
        try {
            const obj: IAbstract = abstractModel.toJSON();
            // See documentation at:
            // https://docs.mongodb.com/manual/reference/method/db.collection.save/
            // Note save is DEPRECATED.
            // See http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#save
            // Or more examples at mongodb client documentation 2.2
            // http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#save
            // See also
            // https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/
            const res: FindAndModifyWriteOpResultObject<IAbstract>
                = await db.collection(thisCollection)
                .findOneAndUpdate({_id: obj._id},
                    { $set: obj} ,
                    {upsert: true});
            if (res.lastErrorObject.updatedExisting === true) {
                console.log(`${this.collection} updated`);
                console.log(`result: ${res}`);
                closeMongo(mongoClient);
            } else {
                console.log(`${this.collection} inserted`);
                console.log(`result: ${res}`);
                closeMongo(mongoClient);
            }
            console.log(res);
            return res;
        } catch (error) {
            // type MongoError
            return Promise.reject(error);
        } finally {
            closeMongo(mongoClient);
        }
    }

};
