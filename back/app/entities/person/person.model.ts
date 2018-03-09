import { AbstractModel } from '../abstract';
import { PersonInterface } from '../entities-interface';

export abstract class Person extends AbstractModel {

    constructor(
        _id: string,
        private _firstname: string,
        private _lastname: string,
        private _address: string) {
        super(_id);
    }

    get firstname(): string {
        return this._firstname;
    }

    set firstname(firstname: string) {
        this._firstname = firstname;
    }

    get lastname(): string {
        return this._lastname;
    }

    set lastname(lastname: string) {
        this._lastname = lastname;
    }

    get address(): string {
        return this._address;
    }

    set address(address: string) {
        this._address = address;
    }

    toJSON(): PersonInterface {
        // return Object.assign({}, {
        //     _firstname: this._firstname,
        //     _lastname: this._lastname,
        //     _address: this._address,
        // }, super.toJSON());
        return {...{
            _firstname: this._firstname,
            _lastname: this._lastname,
            _address: this._address
        }, ...super.toJSON()};
    }
}
