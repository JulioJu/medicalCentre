import * as mongoose from 'mongoose';
import { PersonSchemaObject } from '../person';

export const PatientSchema = {
    ...PersonSchemaObject,
    _idSSN : {type: String, required: true, unique: true,
        validate: {
          isAsync: false,
          validator: (v: string): boolean => /^\d{15}$/.test(v),
         message: '{VALUE} is not a valid social security number!'
        }
    },
    _isMale     : {type: Boolean, required: true},
    _birthday   : {type: mongoose.Schema.Types.Date, required: true},
    _address    : {type: String, required: true},
    _longitude  : {type: Number, required: true},
    _latitude   : {type: Number, required: true}
};
