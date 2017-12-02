import { IAddressJSON} from '../address';

export class Address {

    constructor(
        private _id: number,
        protected _city: string,
        protected _zip?: string,
        protected _street?: string,
        protected _numberStreet?: number,
        protected _floor?: number,
        protected _lat?: number,
        protected _lng?: number) {
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    toJSON(): IAddressJSON {
        return {
            id: this._id,
            city: this._city,
            zip: this._zip,
            street: this._street,
            numberStreet: this._numberStreet,
            floor: this._floor,
            lat: this._lat,
            lng: this._lng
        }
    }

}
