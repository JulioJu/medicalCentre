// import * as mongoose from 'mongoose';
import { PersonSchemaObject } from '../person';
import { EnumGenderMongoose } from '../entities-interface/enum-gender';

export const PatientSchema = {
    ...PersonSchemaObject,

    // https://mongoosejs.com/docs/faq.html
    // Mongoose doesn't handle unique on its own: { name: { type: String,
    // unique: true } } is just a shorthand for creating a MongoDB unique index
    // on name. For example, if MongoDB doesn't already have a unique index on
    // name, the below code will not error despite the fact that unique is true.
    _idSSN : {type: String, required: true, unique: true,
        validate: {
          isAsync: false,
          validator: (v: string): boolean => /^\d{15}$/.test(v),
         message: '{VALUE} is not a valid social security number!'
        }
    },

    _gender      : {type: String, enum: EnumGenderMongoose, required: true},

    // Not compatible with JavaScript Date
    // _birthday   : {type: mongoose.Schema.Types.Date, required: true},

    // Actually date is in stored as
    // https://en.wikipedia.org/wiki/ISO_8601
    _birthday   : {type: Date, required: true},

    _address    : {type: String, required: true},
    _longitude  : {type: Number, required: true},
    _latitude   : {type: Number, required: true}
};
