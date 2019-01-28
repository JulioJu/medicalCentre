import { IAbstract } from '../entities-interface';

export abstract class AbstractModel {
    // not mandatory, because it's better if MongoDB create it's own id.
    // We could instantiate an AbstractModel without _id.

    public constructor(private _id: string) {
    }

    public get id(): string {
        return this._id;
    }

    public set id(_id: string)  {
        this._id = _id;
    }

    public toJSON(): IAbstract {
        return {_id: this._id};
    }
}
