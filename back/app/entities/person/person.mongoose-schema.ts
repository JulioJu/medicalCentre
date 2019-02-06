import { AbstractSchemaObject } from '../abstract';

export const PersonSchemaObject = {
    ...AbstractSchemaObject,
    _firstname: {type: String, required: true},
    _lastname: {type: String, required: true}
};
