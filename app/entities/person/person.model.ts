import {PersonJSON} from './person.json';

export abstract class Person {

    constructor(protected _firstname: string,
    protected _lastname: string,
    protected _address: string) {

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
        return {
            firstname: this._firstname,
            lastname: this._lastname,
            address: this._address,
        }
    }
}
