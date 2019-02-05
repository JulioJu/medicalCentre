import { testId, checkCollection, IAbstractService, AbstractModel } from './';
import { IAbstract } from '../entities-interface';
import * as mongoose from 'mongoose';
// import { ObjectID } from 'bson';
import { FindAndModifyWriteOpResultObject,
    DeleteWriteOpResultObject } from 'mongodb';

interface IAbstractServiceMongooseType extends IAbstractService {
    mongooseModel?: mongoose.Model<mongoose.Document>;
    constructorStatic(abstractSchema: mongoose.Schema,
        collection: string): void;
}

const ErrorDBMessage = {errorMessage: 'Object garbaged'};

export const AbstractServiceMongoose: IAbstractServiceMongooseType = {

    collection: undefined,

    mongooseModel: undefined,

    constructorStatic (
            abstractSchema: mongoose.Schema,
            collection: string
        ): void {
        this.collection = checkCollection(collection);
        if (!this.mongooseModel) {
            this.mongooseModel = mongoose
                .model(this.collection, abstractSchema);
        }
    },

    async getRecords(): Promise<mongoose.Document[]> {
        if (this.mongooseModel) {
            return this.mongooseModel.find();
        } else {
            return Promise.reject(ErrorDBMessage);
        }
    },

    async getRecord(_id: string): Promise<mongoose.Document | null> {
        try {
            testId(_id);
        } catch (error) {
            throw new Error(error);
        }
        if (this.mongooseModel) {
            return this.mongooseModel.findById(_id);
        } else {
            return Promise.reject(ErrorDBMessage);
        }
    },

    async deleteRecord(id: string):
            Promise<DeleteWriteOpResultObject['result']> {
        if (this.mongooseModel) {
            return this.mongooseModel.deleteOne({_id: id});
        } else {
            return Promise.reject(ErrorDBMessage);
        }
    },

    // tslint:disable:max-line-length
    async insertOrUpdate(myEntity: AbstractModel):
        Promise<FindAndModifyWriteOpResultObject<IAbstract>> {
        if (this.mongooseModel) {
            // FIXME: actually totally wrong defnition !!
            // @ts-ignore: 2345
            const result: FindAndModifyWriteOpResultObject<IAbstract> =
                this.mongooseModel.findOneAndUpdate(
                    // find a document with that filter
                    {_id: myEntity.id},
                    // document to insert when nothing was found
                    { $set: myEntity } ,
                    // options
                    {upsert: true, new: true, runValidators: true
                        , rawResult: true});
            let savedOrUpdated = 'saved';
            // let isUpdated = false;
            if (result.lastErrorObject.updatedExisting) {
                savedOrUpdated = 'updated';
                // isUpdated = true;
            }
            console.info('You have', savedOrUpdated, ':\n',
                result);
            return result;
        } else {
            return Promise.reject(ErrorDBMessage);
        }
    }

};
