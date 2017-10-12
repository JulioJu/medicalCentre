import {NurseJSON} from './nurseJSON';
import {Person} from './person';

export abstract class Nurse extends Person {

    constructor(
        private _id: number,
        protected _firstname: string,
        protected _lastname: string,
        protected _address: string) {
        super(_firstname, _lastname, _address);
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    toJSON(): NurseJSON {
        return Object.assign({}, {id: this._id}, super.toJSON());
    }

}
