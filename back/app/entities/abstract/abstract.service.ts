import { IFormPutSuccess } from '../../utils/form-rest-api/iformputsuccess';

export interface IAbstractService {
    collection?: string;
    getRecords(): Promise<any>;
    getRecord(_id: string): Promise<any>;
    deleteRecord(_id: string): Promise<any>;
    insertOrUpdate(myEntity: any): Promise<IFormPutSuccess>;
}

export const checkCollection = (value: any): string => {
    if (value) {
        return value;
    } else {
        throw new Error('collection is not defined');
    }
};

export const testId = (_id: any, reject: any) => {
    if (!_id) {
        const mess = 'Can\'t find a record with _id null or undefined.';
        console.error(JSON.stringify(mess));
        reject(new Error(mess));
    } else if (typeof _id !== 'string') {
        const mess = 'Your _id is not a string, so it\'s not a valid _id.';
        console.error(JSON.stringify(mess));
        reject(new Error(mess));
    }
};
