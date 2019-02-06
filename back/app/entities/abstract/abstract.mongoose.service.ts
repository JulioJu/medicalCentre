import { IAbstractService, AbstractModel } from './';
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

export const AbstractServiceMongoose: IAbstractServiceMongooseType = {

    collection: undefined,

    mongooseModel: undefined,

    constructorStatic (
            abstractSchema: mongoose.Schema,
            collection: string
        ): void {
        this.collection = collection;
        this.mongooseModel = mongoose
            .model(this.collection, abstractSchema);
    },

    async getRecords(): Promise<mongoose.Document[]> {
        return (this.mongooseModel as mongoose.Model<mongoose.Document>).find();
    },

    async getRecord(_id: string): Promise<mongoose.Document | null> {
        return (this.mongooseModel as mongoose.Model<mongoose.Document>)
            .findById(_id);
    },

    async deleteRecord(id: string):
            Promise<DeleteWriteOpResultObject['result']> {
        return (this.mongooseModel as mongoose.Model<mongoose.Document>)
                .deleteOne({_id: id});
    },

    // tslint:disable:max-line-length
    async insertOrUpdate(myEntity: AbstractModel):
        Promise<FindAndModifyWriteOpResultObject<IAbstract>> {
        // FIXME: actually totally wrong defnition at @types/mongodb!!
        //  post a Pull Request
        // @ts-ignore: 2345
        const result: FindAndModifyWriteOpResultObject<IAbstract> =
            // Said  'Invalid 'await' of a non-Promise value.', but
            // it's a promise, I have tested !!
            // tslint:disable-next-line:await-promise
            await (this.mongooseModel as mongoose.Model<mongoose.Document>)
                    .findOneAndUpdate(
                // find a document with that filter
                {_id: myEntity.id},
                // document to insert when nothing was found
                { $set: myEntity } ,
                // options
                {upsert: true, new: true, runValidators: true
                    , rawResult: true});
        let savedOrUpdated = 'saved';
        // tslint:disable-next-line:no-unsafe-any
        if (result.lastErrorObject.updatedExisting) {
            savedOrUpdated = 'updated';
            // isUpdated = true;
        }
        console.info('You have', savedOrUpdated, ':\n',
            result);
        return result;
    }

};
