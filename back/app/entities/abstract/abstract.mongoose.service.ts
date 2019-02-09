import { IAbstractService, AbstractModel } from './';
import { IAbstract } from '../entities-interface';
import * as mongoose from 'mongoose';
// import { ObjectID } from 'bson';
import { FindAndModifyWriteOpResultObject,
    DeleteWriteOpResultObject } from 'mongodb';
import { ObjectID } from 'bson';

// tslint:disable:no-unsafe-any

// tslint:disable:no-any interface-name
declare module 'mongoose' {
    // See my pull request
    // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/32874
    interface Model<T extends Document, QueryHelpers = {}>
        extends NodeJS.EventEmitter, ModelProperties {
    findOneAndUpdate(query: {_id: string}, update: any,
      options: { rawResult: true } & { upsert: true }
        & { new: true } & QueryFindOneAndUpdateOptions,
      callback?: (err: any,
          doc: FindAndModifyWriteOpResultObject<IAbstract>, res: any) => void):
                Promise<FindAndModifyWriteOpResultObject<IAbstract>>
                & QueryHelpers;
    }
    // Documentation: Document.prototype.validateSync returns ValidationError
    // See my pull request:
    // https://github.com/Automattic/mongoose/pull/7499
    // In the following `declare', Interface is `Document' and not
    // `SchemaTypeOpts' contrary to the official node_modules package,
    // because otherwise following has not priority upon official definition.
    // official package @types/mongoose persist.
    // interface SchemaTypeOpts<T> {
    interface Document {
        validateSync(): Error.ValidationError;
    }
}
// tslint:enable:no-any

interface IAbstractServiceMongooseType extends IAbstractService {
    mongooseModel?: mongoose.Model<mongoose.Document>;
    constructorStatic(abstractSchema: { _id: StringConstructor },
        collection: string): void;
}

// Don't forget that it's no mandatory to add keyboard `await`
// when we call a Promise in a return function.
export const AbstractServiceMongoose: IAbstractServiceMongooseType = {

    collection: undefined,

    mongooseModel: undefined,

    constructorStatic (
            abstractSchema: {},
            collection: string
        ): void {
        this.collection = collection;
        this.mongooseModel = mongoose
            .model(this.collection,
                new mongoose.Schema({...abstractSchema}, {timestamps: true}));
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
        if (!myEntity.id) {
            // tslint:disable-next-line
            // https://stackoverflow.com/questions/10593337/is-there-any-way-to-create-mongodb-like-id-strings-without-mongodb
            myEntity.id = new ObjectID().toHexString();
        }
        myEntity.updatedAt = new Date();

        // // I've checked on the code, `findOneAndUpdate' trigger validate
        // // like this and no validateSync
        // // type Promise<void> because return void if success!!
        // const entityToSave = new
        //     (this.mongooseModel as mongoose.Model<mongoose.Document>)(myEntity);
        // console.log(entityToSave);
        // await entityToSave.validate();

        const result:
            FindAndModifyWriteOpResultObject<IAbstract> =
            // See ./back/README.md and:
            // https://github.com/Automattic/mongoose/issues/7506
            // tslint:disable-next-line:await-promise no-invalid-await
            await (this.mongooseModel as mongoose.Model<mongoose.Document>)
                    .findOneAndUpdate(
                // find a document with that filter
                {_id: myEntity.id},
                // document to insert when nothing was found
                { $set: myEntity } ,
                // options
                {upsert: true, new: true, runValidators: true,
                        rawResult: true });
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
