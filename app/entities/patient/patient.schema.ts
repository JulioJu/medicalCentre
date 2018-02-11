import { PersonSchema } from '../person';

export class PatientSchema implements PersonSchema {
    _id = String;
    _idSSN = {type: String, required: true, unique: true,
        validate: {
          isAsync: false,
          validator: (v: any) => {
           return /^\d{15}$/.test(v);
          },
         message: '{VALUE} is not a valid social security number!'
        }
    }
    _firstname = {type: String, required: true};
    _lastname = {type: String, required: true};
    _isMale = {type: String, required: true};
    _birthday = {type: String, required: true};
    _address    = String;
}
