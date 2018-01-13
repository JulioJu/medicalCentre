import { Nurse } from './';
import { AbstractService } from '../abstract/abstract.service';

export class NurseService extends AbstractService {

    insertOrUpdate(myNurse: Nurse): Promise<any> {
        return super.insertOrUpdateNested(myNurse, 'nurse');
    }

    getRecords(): Promise<any> {
        return super.getRecordsNested('nurse');
    }

}
