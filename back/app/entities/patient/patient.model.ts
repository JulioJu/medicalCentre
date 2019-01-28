import { IPatient } from '../entities-interface';
import { Person } from '../person';

export class Patient extends Person {

    public constructor(
         _id: string,
        private _idSSN: string,
        _firstname: string,
        _lastname: string,
        private _isMale: boolean,
        private _birthday: string,
        _address: string) {
        super(_id, _firstname, _lastname, _address);
    }

    public get idSSN(): string {
        return this._idSSN;
    }

    public set idSSN(idSSN: string) {
        this._idSSN = idSSN;
    }

    public get isMale(): boolean {
        return this._isMale;
    }

    public set isMale(isMale: boolean) {
        this._isMale = isMale;
    }

    public get birthday(): string {
        return this._birthday;
    }

    public set birthday(birthday: string) {
        this._birthday = birthday;
    }

    public toJSON(): IPatient {
        // return Object.assign({}, {_idSSN: this._idSSN, _isMale: this._isMale,
        //     _birthday: this._birthday}, super.toJSON());
        return {...{_idSSN: this._idSSN, _isMale: this._isMale,
            _birthday: this._birthday}, ...super.toJSON()};
    }

}
