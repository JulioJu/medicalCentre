import * as mongoose from 'mongoose';

import { AbstractSchemaObject } from '../abstract';

export const PersonSchemaObject = {
    ...AbstractSchemaObject,
    _firstname: {type: String, required: true},
    _lastname: {type: String, required: true}
};

export const PersonSchema = new mongoose.Schema ({
    ...PersonSchemaObject
});
