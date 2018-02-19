import { AbstractSchema } from './';
import * as mongoose from 'mongoose';

interface AbstractServiceMongooseType {
    mongooseModel: mongoose.Model<any>;
    constructorStatic<U extends AbstractSchema>(abstractSchemaTy: new
        (...args: any[]) => U, collection: string): void;
    getRecords<U extends AbstractSchema>(abstractSchemaTy: new (...args:
        any[]) => U, collection: string): Promise<any>;
    getRecord(_id: string): Promise<any>;
    deleteRecord(_id: string): Promise<any>;
    insertOrUpdate<U extends AbstractSchema>(abstractSchemaTy: new (...args:
        any[]) => U, collection: string,
        myEntity: any): Promise<any>;
}

export const AbstractServiceMongoose: AbstractServiceMongooseType = {

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

    getRecords<U extends AbstractSchema>(abstractSchemaTy: new (...args:
        any[]) => U, collection: string): Promise<any> {
        this.constructorStatic(abstractSchemaTy, collection);
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
    // TODO https://silvantroxler.ch/2016/insert-or-update-with-mongodb-and-mongoose/
    insertOrUpdate<U extends AbstractSchema>(abstractSchemaTy: new (...args:
        any[]) => U, collection: string, myEntity: any):
        Promise<any> {
            this.constructorStatic(abstractSchemaTy, collection);
            return new Promise<any>((resolve, reject) => {
                this.constructorStatic(abstractSchemaTy, collection);
                const abstractModel: mongoose.Document =
                    new this.mongooseModel(myEntity);
                abstractModel.save((err, saved) => {
                    if (err) {
                        const errorString = err.toString();
                        console.error('The object', myEntity,
                            'wasn\'t saved in the collection "',
                            collection, '" because:\n',
                            errorString.split('\n', 1)[0]);
                    } else {
                        console.info('You have tried to save the object',
                        myEntity,
                        '\nYou have saved:\n', saved);
                    }
                });
            });
    }

}
