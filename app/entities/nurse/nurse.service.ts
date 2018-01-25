import { Nurse } from './';
import { AbstractService } from '../abstract/abstract.service';

export class NurseService extends AbstractService {

    getRecords(): Promise<any> {
        return super.getRecordsNested('nurse');
    }

    getRecord(_id) {
        return super.getRecordNested('nurse', _id);
    }

    deleteRecord(_id) {
        return super.deleteRecordNested('nurse', _id);
    }

    insertOrUpdate(myNurse: Nurse): Promise<any> {
        return super.insertOrUpdateNested('nurse', myNurse);
    }

}
