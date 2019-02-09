import { IPatient, EnumGenderType } from '../entities-interface';
import { Person } from '../person';

export class Patient extends Person {

    public constructor(
         _id: string,
        private _idSSN: string,
        _firstname: string,
        _lastname: string,
        private _gender: EnumGenderType,
        private _birthday: string,
        private _address: string,
        private _longitude: number,
        private _latitude: number,
        updatedAt: Date
    ) {
        super(_id, _firstname, _lastname, updatedAt);
    }

    public get idSSN(): string {
        return this._idSSN;
    }

    public set idSSN(idSSN: string) {
        this._idSSN = idSSN;
    }

    public get isMale(): EnumGenderType {
        return this._gender;
    }

    public set isMale(isMale: EnumGenderType) {
        this._gender = isMale;
    }

    public get birthday(): string {
        return this._birthday;
    }

    public set birthday(birthday: string) {
        this._birthday = birthday;
    }

    public get address(): string {
        return this._address;
    }

    public set address(address: string) {
        this._address = address;
    }

    public get longitude(): number {
        return this._longitude;
    }

    public set longitude(longitude: number) {
        this._longitude = longitude;
    }

    public get latitude(): number {
        return this._latitude;
    }

    public set latitude(latitude: number) {
        this._latitude = latitude;
    }

    public toJSON(): IPatient {
        // return Object.assign({}, {_idSSN: this._idSSN, _gender: this._gender,
        //     _birthday: this._birthday}, super.toJSON());
        return {...{_idSSN: this._idSSN,
                    _gender: this._gender,
                    _birthday: this._birthday,
                    _address: this._address,
                    _longitude: this._longitude,
                    _latitude: this._latitude
                    }
                , ...super.toJSON()};
    }

}
