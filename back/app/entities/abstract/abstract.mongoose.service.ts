import { testId, checkCollection, IAbstractService, IAbstractSchema } from './';
import * as mongoose from 'mongoose';
import { ObjectID } from 'bson';

const checkMongooseModel = (value: any): mongoose.Model<any> => {
    if (value) {
        return value;
    } else {
        throw new Error('this.mongooseModel is not defined');
    }
};

interface IAbstractServiceMongooseType extends IAbstractService {
    mongooseModel: mongoose.Model<any> | undefined;
    constructorStatic<U extends IAbstractSchema>(abstractSchemaTy: new
        (...args: any[]) => U, collection: string): void;
}

export const AbstractServiceMongoose: IAbstractServiceMongooseType = {

    collection: undefined,

    mongooseModel: undefined,

    constructorStatic<U extends IAbstractSchema>(abstractSchemaTy: new
        (...args: any[]) => U, collection: string): void {
        this.collection = checkCollection(collection);
        if (!this.mongooseModel) {
            const abstractSchema = new mongoose.Schema(
                new abstractSchemaTy() as any, {timestamps: true}
            );
            this.mongooseModel = mongoose
                .model(this.collection, abstractSchema);
        }
    },

    async getRecords(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const thisMongooseModel: mongoose.Model<any> =
                checkMongooseModel(this.mongooseModel);
            thisMongooseModel.find((err, found) => {
                if (err) {
                    reject(err);
                }
                resolve(found);
            });
        });
    },

    async getRecord(_id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            testId(_id, reject);
            const thisMongooseModel: mongoose.Model<any> =
                checkMongooseModel(this.mongooseModel);
            thisMongooseModel.findById(_id, (err, found) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(found);
            });
        });
    },

    async deleteRecord(_id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            testId(_id, reject);
            const thisMongooseModel: mongoose.Model<any> =
                checkMongooseModel(this.mongooseModel);
            thisMongooseModel.findByIdAndRemove(_id,
                (err: any, found: any) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                if (!found) {
                    const mess = 'No entity with id ' + _id + ' exists. ' +
                    'Therfore couldn\'t be deleted.';
                    console.error(mess);
                    reject({n: 0});
                }
                resolve({n: 1, value: found});
            });
        });
    },

    // Only insert, not update !!
    async insertOrUpdate(myEntity: any):
        Promise<any> {
            return new Promise<any>((resolve, reject) => {
                if (!myEntity._id) {
                    // Defined here, because with Mongoose 5, variable
                    // defined 4 lines below have null variable.
                    // TODO maybe it's a bug? I have no idea, but it's strange
                    // because it's a very common example !
                    myEntity._id = new ObjectID().toHexString();
                    const thisMongooseModel: mongoose.Model<any> =
                        checkMongooseModel(this.mongooseModel);
                    const abstractModel: mongoose.Document =
                        new thisMongooseModel(myEntity);
                    abstractModel.save((err, saved) => {
                        if (err) {
                            const errorString = err.toString();
                            const thisCollection =
                                checkCollection(this.collection);
                            const mess = 'The object ' +
                                JSON.stringify(myEntity) +
                                ' wasn\'t saved in the collection « ' +
                                thisCollection + ' » because:\n' +
                                errorString.split('\n', 1)[0];
                            console.error(mess);
                            reject(mess);
                        } else {
                            console.info('You have tried to save the object',
                            myEntity,
                            '\nYou have saved:\n', saved);
                            resolve(saved);
                        }
                    });
                } else {
                    // tslint:disable-next-line
                    // https://silvantroxler.ch/2016/insert-or-update-with-mongodb-and-mongoose/
                    // http://mongoosejs.com/docs/api.html#Model
                    const thisMongooseModel: mongoose.Model<any> =
                        checkMongooseModel(this.mongooseModel);
                    thisMongooseModel.findByIdAndUpdate(
                        myEntity._id, // find a document with that filter
                        myEntity, // document to insert when nothing was found
                        {upsert: true, new: true, runValidators: true
                            , rawResult: true},
                        (err, doc) => { // callback
                            if (err) {
                                console.error(err);
                                reject(err);
                            } else {
                                let savedOrUpdated = 'saved';
                                let isUpdated = false;
                                if (doc.lastErrorObject.updatedExisting) {
                                    savedOrUpdated = 'updated';
                                    isUpdated = true;
                                }
                                console.info('You have', savedOrUpdated, ':\n',
                                    doc.value);
                                resolve(isUpdated);
                            }
                        });
                }
            });
    }

};
