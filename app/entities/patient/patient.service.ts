import { Patient } from './';
import { AbstractService } from '../abstract/abstract.service';

export class PatientService extends AbstractService {

    getRecords(): Promise<any> {
        return super.getRecordsNested('patient');
    }

    getRecord(_id: string) {
        return super.getRecordNested('patient', _id);
    }

    deleteRecord(_id: string) {
        return super.deleteRecordNested('patient', _id);
    }

    insertOrUpdate(myPatient: Patient): Promise<any> {
        return super.insertOrUpdateNested('patient', myPatient);
    }

}
