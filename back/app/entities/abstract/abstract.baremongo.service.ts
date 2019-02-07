import { MongoError, MongoClient, Db,
    FindAndModifyWriteOpResultObject, DeleteWriteOpResultObject }
    from 'mongodb';
import { ObjectID } from 'bson';

import { IAbstractService, AbstractModel } from './';
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

// If we use a class, we could easy factorize
export const AbstractBaremongoService: IAbstractService = {

    collection: undefined,

    async getRecords(): Promise<IAbstract[]> {
        const mongoClient = await promiseConnectToMongo();
        const db: Db = mongoClient.db(MONGO_DB_NAME);
        try {
            return await db.collection(this.collection as string)
                .find()
                .toArray();
        } catch (error) {
            return Promise.reject(error);
        } finally {
            closeMongo(mongoClient);
        }
    },

    async getRecord(id: string): Promise<IAbstract | null> {
        const mongoClient = await promiseConnectToMongo();
        const db: Db = mongoClient.db(MONGO_DB_NAME);
        try {
            return await db.collection(this.collection as string)
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
        const mongoClient = await promiseConnectToMongo();
        const db: Db = mongoClient.db(MONGO_DB_NAME);
        try {
            const res = await db.collection(this.collection as string)
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
        const db: Db = mongoClient.db(MONGO_DB_NAME);
        try {
            const obj: IAbstract = abstractModel.toJSON();
            if (!obj.id) {
                // tslint:disable-next-line
                // https://stackoverflow.com/questions/10593337/is-there-any-way-to-create-mongodb-like-id-strings-without-mongodb
                obj._id = new ObjectID().toHexString();
                // FIXME if {obj.id } and object not already created
                // obj.createdAt will be null.
                // Furthermore in this case we can't deduce created date
                // from id.
                obj.createdAt = new Date();
            }
            obj.updatedAt = new Date();
            // See documentation at:
            // https://docs.mongodb.com/manual/reference/method/db.collection.save/
            // Note save is DEPRECATED.
            // See http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#save
            // Or more examples at mongodb client documentation 2.2
            // http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#save
            // See also
            // https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/
            const res: FindAndModifyWriteOpResultObject<IAbstract>
                = await db.collection(this.collection as string)
                .findOneAndUpdate({_id: obj._id},
                    { $set: obj} ,
                    {upsert: true});
            // tslint:disable-next-line:no-unsafe-any
            if (res.lastErrorObject.updatedExisting === true) {
                console.log(`${this.collection} updated`);
                console.log(`result: ${res}`);
                closeMongo(mongoClient);
            } else {

                // Otherwise it's null, contrary to findOneAndUpdate of
                // Mongoose
                res.value = obj;

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
