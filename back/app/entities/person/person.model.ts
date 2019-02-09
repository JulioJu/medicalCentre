import { AbstractModel } from '../abstract';
import { IPerson } from '../entities-interface';

export abstract class Person extends AbstractModel {

    public constructor(
        _id: string,
        private _firstname: string,
        private _lastname: string,
        updatedAt: Date) {
        super(_id, updatedAt);
    }

    public get firstname(): string {
        return this._firstname;
    }

    public set firstname(firstname: string) {
        this._firstname = firstname;
    }

    public get lastname(): string {
        return this._lastname;
    }

    public set lastname(lastname: string) {
        this._lastname = lastname;
    }

    public toJSON(): IPerson {
        // return Object.assign({}, {
        //     _firstname: this._firstname,
        //     _lastname: this._lastname,
        //     _address: this._address,
        // }, super.toJSON());
        return {...{
            _firstname: this._firstname,
            _lastname: this._lastname
        }, ...super.toJSON()};
    }
}
