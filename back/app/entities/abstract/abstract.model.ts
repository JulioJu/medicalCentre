import { AbstractInterface } from '../entities-interface';

export abstract class AbstractModel {
    // not mandatory, because it's better if MongoDB create it's own id.
    // We could instantiate an AbstractModel without _id.

    constructor(private _id: string) {
    }

    get id(): string {
        return this._id;
    }

    set id(_id: string)  {
        this._id = _id;
    }

    toJSON(): AbstractInterface {
        return {_id: this._id};
    }
}
