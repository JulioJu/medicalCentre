import { AbstractModel } from '../abstract/abstract.model';
import { IAbstract } from '../entities-interface';
import * as mongoose from 'mongoose';
import { FindAndModifyWriteOpResultObject, DeleteWriteOpResultObject }
    from 'mongodb';
export interface IAbstractService {
    // any needed otherwise inherited entities complains that types are not
        // compatibles
    collection?: string;
    // tslint:disable-next-line:no-any
    getRecords(): Promise<any | IAbstract[] | mongoose.Document[]>;
    // tslint:disable-next-line:no-any
    getRecord(_id: string): Promise<any | IAbstract | mongoose.Document>;
    deleteRecord(_id: string): Promise<DeleteWriteOpResultObject['result']>;
    insertOrUpdate(myEntity: AbstractModel):
        Promise<FindAndModifyWriteOpResultObject<IAbstract>>;
}

export const checkCollection = (value?: string): string => {
    if (value) {
        return value;
    } else {
        throw new Error('collection is not defined');
    }
};

export const testId = (_id: string): void => {
    if (!_id) {
        throw new Error('Can\'t find a record with _id null or undefined.');
    }
};
