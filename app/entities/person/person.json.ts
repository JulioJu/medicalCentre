import { AbstractJSON } from '../abstract/abstract.json';

export interface PersonJSON extends AbstractJSON {
    _firstname: string;
    _lastname: string;
    _address: string;
}
