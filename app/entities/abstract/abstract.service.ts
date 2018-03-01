export interface AbstractService {
    collection: string;
    getRecords(): Promise<any>;
    getRecord(_id: string): Promise<any>;
    deleteRecord(_id: string): Promise<any>;
    insertOrUpdate(myEntity: any): Promise<any>;
}
