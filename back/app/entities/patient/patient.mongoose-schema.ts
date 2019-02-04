import { PersonSchema } from '../person';

export class PatientSchema extends PersonSchema {
    public _idSSN = {type: String, required: true, unique: true,
        validate: {
          isAsync: false,
          validator: (v: any) => /^\d{15}$/.test(v),
         message: '{VALUE} is not a valid social security number!'
        }
    };
    public _isMale     = {type: String, required: true};
    public _birthday   = {type: String, required: true};
    public _address    = {type: String, required: true};
    public _longitude  = {type: Number, required: true};
    public _latitude   = {type: Number, required: true};
}
