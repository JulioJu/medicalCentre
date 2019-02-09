import { INurse } from '../entities-interface';
import { Person } from '../person';

export class Nurse extends Person {

    public constructor(
        _id: string,
        _firstname: string,
        _lastname: string,
        updatedAt: Date) {
        super(_id, _firstname, _lastname, updatedAt);
    }

    public toJSON(): INurse {
        // return Object.assign({}, super.toJSON());
        return {...super.toJSON()};
    }

}
