import { Patient } from './';
import { AbstractBaremongoService } from '../abstract';

export class PatientBaremongoService extends AbstractBaremongoService {

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
