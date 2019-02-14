// import * as mongoose from 'mongoose';
import { PersonSchemaObject } from '../person';
import { EnumGenderMongoose } from '../entities-interface/enum-gender';
import { idSSNReg,
    REGEXADDRESS, messageREGEXADDRESS,
    birthdateMinDate, birthdateMaxDate } from '../../utils/validator';

export const PatientSchema = {
    ...PersonSchemaObject,

    // https://mongoosejs.com/docs/faq.html
    // Mongoose doesn't handle unique on its own: { name: { type: String,
    // unique: true } } is just a shorthand for creating a MongoDB unique index
    // on name. For example, if MongoDB doesn't already have a unique index on
    // name, the below code will not error despite the fact that unique is true.
    _idSSN : {type: String,
        // Message not used, used only if we use checkRequired()
        required: [true, 'This SSN exist already '],
        unique: true,
        validate: {
            isAsync: false,
            validator: (v: string): boolean => idSSNReg.test(v),
            message: '{VALUE} is not a valid french social security number!'
        }
    },

    _gender      : {type: String, enum: EnumGenderMongoose, required: true},

    // Not compatible with JavaScript Date
    // _birthday   : {type: mongoose.Schema.Types.Date, required: true},

    // Actually date is in stored as
    // https://en.wikipedia.org/wiki/ISO_8601
    _birthday   : {
        type: Date,
        required: true,
        min: [birthdateMinDate,
            'Only Jeanne Calment lives 122 years !'],
        max: [birthdateMaxDate,
            'Can\'t record patients borned before yesterday'
        ]
    },

    _address    : {
        type: String,
        required: true,
        validate: {
            isAsync: false,
            validator: (v: string): boolean => REGEXADDRESS.test(v),
            message: '{VALUE} should contain only: ' +
            messageREGEXADDRESS
        }
    },
    _longitude  : {type: Number, required: true, min: -90, max: 90},
    _latitude   : {type: Number, required: true, min: -90, max: 90}
};
