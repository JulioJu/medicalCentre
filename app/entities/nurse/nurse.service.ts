import { Nurse } from './';
import { AbstractService } from '../abstract/abstract.service';

export class NurseService extends AbstractService {

    getRecords(): Promise<any> {
        return super.getRecordsNested('nurse');
    }

    getRecord(_id: string) {
        return super.getRecordNested('nurse', _id);
    }

    deleteRecord(_id: string) {
        return super.deleteRecordNested('nurse', _id);
    }

    insertOrUpdate(myNurse: Nurse): Promise<any> {
        return super.insertOrUpdateNested('nurse', myNurse);
    }

}
