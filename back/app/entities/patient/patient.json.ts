import { PersonJSON } from '../person';

export interface PatientJSON extends PersonJSON {
    _idSSN: string;
    _isMale: boolean
    _birthday: string;
}
