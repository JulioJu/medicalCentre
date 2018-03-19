import { IAbstractSchema } from '../abstract';

export interface IPersonSchema extends IAbstractSchema {
    _firstname: {type: StringConstructor; required: boolean};
    _lastname: {type: StringConstructor; required: boolean};
    _address: {type: StringConstructor; required: boolean};
}
