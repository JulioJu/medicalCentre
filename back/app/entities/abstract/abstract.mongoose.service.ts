import { testId, AbstractService, AbstractSchema } from './';
import * as mongoose from 'mongoose';
import { ObjectID } from 'bson';

interface AbstractServiceMongooseType extends AbstractService {
    mongooseModel: mongoose.Model<any>;
    constructorStatic<U extends AbstractSchema>(abstractSchemaTy: new
        (...args: any[]) => U, collection: string): void;
}

export const AbstractServiceMongoose: AbstractServiceMongooseType = {

    collection: null,

    mongooseModel: null,

    constructorStatic<U extends AbstractSchema>(abstractSchemaTy: new
        (...args: any[]) => U, collection: string) {
        if (!this.mongooseModel) {
            const abstractSchema = new mongoose.Schema(
                new abstractSchemaTy() as any, {timestamps: true}
            );
            this.mongooseModel = mongoose.model(collection, abstractSchema);
        }
        this.collection = collection;
    },

    getRecords(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
                this.mongooseModel.find((err, found) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(found);
                });
        });
    },

    getRecord(_id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            testId(_id, reject);
            this.mongooseModel.findById(_id, (err, found) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(found);
            })
        });
    },

    deleteRecord(_id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            testId(_id, reject);
            this.mongooseModel.findByIdAndRemove(_id,
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
            })
        });
    },

    // Only insert, not update !!
    // tslint:disable-next-line
    insertOrUpdate(myEntity: any):
        Promise<any> {
            return new Promise<any>((resolve, reject) => {
                if (!myEntity._id) {
                    // Defined here, because with Mongoose 5, variable
                    // defined 4 lines below have null variable.
                    // TODO maybe it's a bug ? I have no idea, but it's strange
                    // because it's a very common example !
                    myEntity._id = new ObjectID().toHexString();
                    const abstractModel: mongoose.Document =
                        new this.mongooseModel(myEntity);
                    abstractModel.save((err, saved) => {
                        if (err) {
                            const errorString = err.toString();
                            const mess = 'The object ' +
                                JSON.stringify(myEntity) +
                                ' wasn\'t saved in the collection « ' +
                                this.collection + ' » because:\n' +
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
                    this.mongooseModel.findByIdAndUpdate(
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
                                    savedOrUpdated = 'updated'
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

}
