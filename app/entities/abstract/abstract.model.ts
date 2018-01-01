import { AbstractJSON } from './';

export interface AbstractModel {
    toJSON(): AbstractJSON;
}
