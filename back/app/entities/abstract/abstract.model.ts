import { IAbstract } from '../entities-interface';

export abstract class AbstractModel {
    // not mandatory, because it's better if MongoDB create it's own id.
    // We could instantiate an AbstractModel without _id.

    public constructor(private _id: string,
        public updatedAt: Date,
        // Generated only by Mongoose, not by the native MongoDB Driver
        private _createdAt?: Date) {
    }

    public get id(): string {
        return this._id;
    }

    public set id(_id: string)  {
        this._id = _id;
    }

    public get createdAt(): Date | undefined {
        return this._createdAt;
    }

    public set createdAt(_createdAt: Date | undefined)  {
        this._createdAt = _createdAt;
    }

    public toJSON(): IAbstract {
        return {_id: this._id,
            _createdAt: this._createdAt,
            updatedAt: this.updatedAt
        };
    }
}
