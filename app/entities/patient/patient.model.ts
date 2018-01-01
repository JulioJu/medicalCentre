import { PatientJSON } from './patient.json';
import { Person } from '../person';

export class Patient extends Person {

    constructor(
        private _idSSN: number,
        protected _firstname: string,
        protected _lastname: string,
        protected _isMale: boolean,
        protected _birthday: string,
        protected _address: string) {
        super(_firstname, _lastname, _address);
    }

    get idSSN(): number {
        return this._idSSN;
    }

    set idSSN(idSSN: number) {
        this._idSSN = idSSN;
    }

    get isMale(): boolean {
        return this._isMale;
    }

    set isMale(isMale: boolean) {
        this._isMale = isMale;
    }

    get birthday(): string {
        return this._birthday;
    }

    set birthday(birthday: string) {
        this._birthday = birthday;
    }

    toJSON(): PatientJSON {
        return Object.assign({}, {idSSN: this._idSSN, isMale: this._isMale,
            birthday: this._birthday}, super.toJSON());
    }

}
