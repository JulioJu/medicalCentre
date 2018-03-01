import { AbstractService, AbstractSchema } from './';
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
        throw new Error('No implemented exception')
    },

    deleteRecord(_id: string): Promise<any> {
        throw new Error('No implemented exception')
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
                            console.error('The object', myEntity,
                                'wasn\'t saved in the collection "',
                                this.collection, '" because:\n',
                                errorString.split('\n', 1)[0]);
                        } else {
                            console.info('You have tried to save the object',
                            myEntity,
                            '\nYou have saved:\n', saved);
                        }
                    });
                } else {
                    // tslint:disable-next-line
                    // https://silvantroxler.ch/2016/insert-or-update-with-mongodb-and-mongoose/
                    // http://mongoosejs.com/docs/api.html#Model
                    this.mongooseModel.findOneAndUpdate(
                        {_id: myEntity._id}, // find a document with that filter
                        myEntity, // document to insert when nothing was found
                        {upsert: true, new: true, runValidators: true
                            , rawResult: true},
                        (err, doc) => { // callback
                            if (err) {
                                console.error(err);
                            } else {
                                let savedOrUpdated = 'saved';
                                if (doc.lastErrorObject.updatedExisting) {
                                    savedOrUpdated = 'updated'
                                }
                                console.info('You have', savedOrUpdated, ':\n',
                                    doc.value);
                            }
                        });
                }
            });
    }

}
