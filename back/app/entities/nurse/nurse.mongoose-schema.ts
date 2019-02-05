import * as mongoose from 'mongoose';

import { PersonSchemaObject } from '../person';

export const NurseSchema = new mongoose.Schema ({
    ...PersonSchemaObject
});
