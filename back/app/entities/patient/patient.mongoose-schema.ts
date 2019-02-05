import { PersonSchemaObject } from '../person';

import * as mongoose from 'mongoose';

export const PatientSchema = new mongoose.Schema ({
    ...PersonSchemaObject,
    _idSSN : {type: String, required: true, unique: true,
        validate: {
          isAsync: false,
          validator: (v: string): boolean => /^\d{15}$/.test(v),
         message: '{VALUE} is not a valid social security number!'
        }
    },
    _isMale     : {type: String, required: true},
    _birthday   : {type: String, required: true},
    _address    : {type: String, required: true},
    _longitude  : {type: Number, required: true},
    _latitude   : {type: Number, required: true}
});
