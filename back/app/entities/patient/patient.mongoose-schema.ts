import { IPersonSchema } from '../person';

export class PatientSchema implements IPersonSchema {
    public _id = String;
    public _idSSN = {type: String, required: true, unique: true,
        validate: {
          isAsync: false,
          validator: (v: any) => /^\d{15}$/.test(v),
         message: '{VALUE} is not a valid social security number!'
        }
    };
    public _firstname  = {type: String, required: true};
    public _lastname   = {type: String, required: true};
    public _isMale     = {type: String, required: true};
    public _birthday   = {type: String, required: true};
    public _address    = {type: String, required: true};
}
