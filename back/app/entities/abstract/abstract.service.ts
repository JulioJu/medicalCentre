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
        Promise<FindAndModifyWriteOpResultObject<IAbstract>
            | mongoose.Error.ValidatorError>;
}
