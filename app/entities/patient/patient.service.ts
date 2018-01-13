import { Patient } from './';
import { AbstractService } from '../abstract/abstract.service';

export class PatientService extends AbstractService {

    insertOrUpdate(myPatient: Patient): Promise<any> {
        return super.insertOrUpdateNested(myPatient, 'patient');
    }

    getRecords(): Promise<any> {
        return super.getRecordsNested('patient');
    }

}
