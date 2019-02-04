import { PersonSchema } from '../person';

export class NurseSchema implements PersonSchema {
    public _id         = String;
    public _firstname  = {type: String, required: true};
    public _lastname   = {type: String, required: true};
}
