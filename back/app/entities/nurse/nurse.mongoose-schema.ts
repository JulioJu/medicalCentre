import { IPersonSchema } from '../person';

export class NurseSchema implements IPersonSchema {
    _id         = String;
    _firstname  = {type: String, required: true};
    _lastname   = {type: String, required: true};
    _address    = {type: String, required: true};
}
