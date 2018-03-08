export interface AbstractService {
    collection: string | undefined;
    getRecords(): Promise<any>;
    getRecord(_id: string): Promise<any>;
    deleteRecord(_id: string): Promise<any>;
    insertOrUpdate(myEntity: any): Promise<any>;
}

export const checkCollection = (value: any): string => {
    if (value) {
        return value;
    } else {
        throw new Error('collection is not defined');
    }
};

export const testId = (_id: string, reject: any) => {
    if (!_id) {
        const mess = 'Can\'t find a record with _id null or undefined.';
        console.error(mess);
        reject(new Error(mess));
    } else if (typeof _id !== 'string') {
        const mess = 'Your _id is not a string, so it\'s not a valid _id.';
        console.error(mess);
        reject(new Error(mess));
    }
};
