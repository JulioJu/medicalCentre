import { IAbstract } from '../entities-interface';

export abstract class AbstractModel {
    // not mandatory, because it's better if MongoDB create it's own id.
    // We could instantiate an AbstractModel without _id.

    public constructor(private _id: string,
        // should be in constructor for Mongoose
        private _createdAt?: Date,
        private _updatedAt?: Date) {
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

    public get updatedAt(): Date | undefined {
        return this._updatedAt;
    }

    public set updatedAt(_updatedAt: Date | undefined)  {
        this._updatedAt = _updatedAt;
    }

    public toJSON(): IAbstract {
        return {_id: this._id,
            _createdAt: this._createdAt,
            _updatedAt: this._updatedAt
        };
    }
}
