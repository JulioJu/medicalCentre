import { AbstractSchema } from '../abstract';

export abstract class PersonSchema extends AbstractSchema {
    public _firstname = {type: String, required: true};
    public _lastname  = {type: String, required: true};
}
