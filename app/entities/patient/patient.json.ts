import { PersonJSON } from '../person';

export interface PatientJSON extends PersonJSON {
    _idSSN: number;
    _isMale: boolean
    _birthday: string;
}
