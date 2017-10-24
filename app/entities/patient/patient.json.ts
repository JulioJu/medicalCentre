import {PersonJSON} from '../person';

export interface PatientJSON extends PersonJSON {
    idSSN: number;
    isMale: boolean
    birthday: string;
}
