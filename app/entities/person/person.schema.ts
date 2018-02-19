import { AbstractSchema } from '../abstract';

export interface PersonSchema extends AbstractSchema {
    _firstname: {type: StringConstructor; required: boolean};
    _lastname: {type: StringConstructor; required: boolean};
    _address: {type: StringConstructor; required: boolean};
}
