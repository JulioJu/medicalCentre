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
    mongooseModel?: mongoose.Model<any>;
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
                    console.error(JSON.stringify(err));
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
                    console.error(JSON.stringify(err));
                    reject(err);
                }
                if (!found) {
                    const mess = 'No entity with id ' + _id + ' exists. ' +
                    'Therfore couldn\'t be deleted.';
                    console.error(JSON.stringify(mess));
                    reject({n: 0});
                }
                resolve({n: 1, value: found});
            });
        });
    },

    // Only insert, not update !!
    // tslint:disable-next-line:cognitive-complexity
    async insertOrUpdate(myEntity: any):
        Promise<any> {
            return new Promise<any>((resolve, reject) => {
                // For Create an AbstractModel
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
                    abstractModel.save()
                        .then((doc) => {
                            console.info('You have tried to save the object',
                                myEntity,
                                '\nYou have saved:\n', doc);
                            resolve({
                                isUpdate: false,
                                entity: doc
                            });
                    })
                    .catch((err) => {
                        console.error(JSON.stringify(err));
                        reject(err);
                    }) ;
                    // Or following (without promises).
                    // abstractModel.save((err, saved) => {
                    //     if (err) {
                    //         console.error(JSON.stringify(err));
                    //         reject(err);
                    //     } else {
                    //         console.info('You have tried to save the object',
                    //         myEntity,
                    //         '\nYou have saved:\n', saved);
                    //         resolve({
                    //             isUpdate: false,
                    //             entity: saved
                    //         });
                    //     }
                    // });
                }
                // For Edit an AbstractModel
                // tslint:disable-next-line:one-line
                else {
                    // tslint:disable-next-line
                    // https://silvantroxler.ch/2016/insert-or-update-with-mongodb-and-mongoose/
                    // http://mongoosejs.com/docs/api.html#Model
                    const thisMongooseModel: mongoose.Model<any> =
                        checkMongooseModel(this.mongooseModel);
                    thisMongooseModel.findByIdAndUpdate(
                        // find a document with that filter
                        myEntity._id,
                        // document to insert when nothing was found
                        myEntity,
                        // options
                        {upsert: true, new: true, runValidators: true
                            , rawResult: true},
                        // callback
                        (err, doc) => {
                            if (err) {
                                console.error(JSON.stringify(err));
                                reject(err);
                            } else {
                                let savedOrUpdated = 'saved';
                                let isUpdated = false;
                                if (doc.lastErrorObject.updatedExisting) {
                                    savedOrUpdated = 'updated';
                                    isUpdated = true;
                                }
                                console.info('You have', savedOrUpdated, ':\n',
                                    doc);
                                resolve({
                                    isUpdate: isUpdated,
                                    entity: doc.value
                                });
                            }
                        });
                }
            });
    }

};
