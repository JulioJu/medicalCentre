import { INurse } from '../entities-interface';
import { Person } from '../person';

export class Nurse extends Person {

    public constructor(
        _id: string,
        _firstname: string,
        _lastname: string,
        _address: string) {
        super(_id, _firstname, _lastname, _address);
    }

    public toJSON(): INurse {
        // return Object.assign({}, super.toJSON());
        return {...super.toJSON()};
    }

}
