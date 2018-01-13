import { AbstractModel } from '../abstract';
import { PersonJSON } from './person.json';

export abstract class Person extends AbstractModel {

    constructor(
        _id,
        private _firstname: string,
        private _lastname: string,
        private _address: string) {
        super(_id);
    }

    get firstname(): string {
        return this._firstname;
    }

    get lastname(): string {
        return this._lastname;
    }

    get address(): string {
        return this._address;
    }

    set firstname(firstname: string) {
        this.firstname = firstname;
    }

    set lastname(lastname: string ) {
        this.lastname = lastname;
    }

    set address(address: string) {
        this._address = address;
    }

    toJSON(): PersonJSON {
        return Object.assign({}, {
            _firstname: this._firstname,
            _lastname: this._lastname,
            _address: this._address,
        }, super.toJSON());
    }
}
