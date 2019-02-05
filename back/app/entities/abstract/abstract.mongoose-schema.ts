import * as mongoose from 'mongoose';

export const AbstractSchemaObject = {
    _id: String
};

export const AbstractSchema = new mongoose.Schema ({
    ...AbstractSchemaObject
});
