import { PersonSchema } from '../person';

export class NurseSchema implements PersonSchema {
    _id = String;
    _firstname = {type: String, required: true};
    _lastname = {type: String, required: true};
    _address    = String;
}
