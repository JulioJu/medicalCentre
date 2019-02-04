import { IPerson } from './';

export interface IPatient extends IPerson {
    _idSSN: string;
    _isMale: boolean;
    _birthday: string;
    _address: string;
    _longitude: number;
    _latitude: number;
}
