import { Patient } from './';
import { AbstractService } from '../abstract/abstract.service';

export class PatientService extends AbstractService {

    addPatient(myPatient: Patient): Promise<any> {
        return super.addEntity(myPatient, 'patient');
    }

    getPatients(): Promise<any> {
        return super.getEntity('patient');
    }

}
