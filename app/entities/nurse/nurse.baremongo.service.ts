import { Nurse } from './';
import { AbstractBaremongoService } from '../abstract';

export class NurseBaremongoService extends AbstractBaremongoService {

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
