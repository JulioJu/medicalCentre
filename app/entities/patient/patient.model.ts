import { PatientJSON } from './patient.json';
import { Person } from '../person';

export class Patient extends Person {

    constructor(
         _id: string,
        private _idSSN: number,
        _firstname: string,
        _lastname: string,
        private _isMale: boolean,
        private _birthday: string,
        _address: string) {
        super(_id, _firstname, _lastname, _address);
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
        return Object.assign({}, {_idSSN: this._idSSN, _isMale: this._isMale,
            _birthday: this._birthday}, super.toJSON());
    }

}
