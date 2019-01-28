import { IPersonSchema } from '../person';

export class NurseSchema implements IPersonSchema {
    public _id         = String;
    public _firstname  = {type: String, required: true};
    public _lastname   = {type: String, required: true};
    public _address    = {type: String, required: true};
}
