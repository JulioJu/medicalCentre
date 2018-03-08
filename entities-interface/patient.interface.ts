import { PersonInterface } from './';

export interface PatientInterface extends PersonInterface {
    _idSSN: string;
    _isMale: boolean;
    _birthday: string;
}
