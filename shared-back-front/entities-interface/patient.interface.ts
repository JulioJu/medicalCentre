import { IPerson } from './';
import { EnumGenderType } from '../entities-interface/enum-gender';

export interface IPatient extends IPerson {
    _idSSN: string;
    _gender: EnumGenderType;
    _birthday: string;
    _address: string;
    _longitude: number;
    _latitude: number;
}
