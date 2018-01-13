import { NurseJSON } from './nurse.json';
import { Person } from '../person';

export class Nurse extends Person {

    constructor(
        _id: string,
        _firstname: string,
        _lastname: string,
        _address: string) {
        super(_id, _firstname, _lastname, _address);
    }

    toJSON(): NurseJSON {
        return Object.assign({}, super.toJSON());
    }

}
