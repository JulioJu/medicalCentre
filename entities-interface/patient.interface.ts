import { IPerson } from './';

export interface IPatient extends IPerson {
    _idSSN: string;
    _isMale: boolean;
    _birthday: string;
}
