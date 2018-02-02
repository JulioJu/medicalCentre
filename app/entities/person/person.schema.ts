import { AbsctractSchema } from '../abstract';

export interface PersonSchema extends AbsctractSchema {
    _firstname: {type: StringConstructor, required: boolean};
    _lastname: {type: StringConstructor, required: boolean};
    _address: StringConstructor;
}
