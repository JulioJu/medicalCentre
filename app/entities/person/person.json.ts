import { AbstractJSON } from '../abstract/abstract.json';

export interface PersonJSON extends AbstractJSON {
    firstname: string;
    lastname: string;
    address: string;
}
