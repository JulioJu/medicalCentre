import { Nurse } from './';
import { AbstractService } from '../abstract/abstract.service';

export class NurseService extends AbstractService {

    addNurse(myNurse: Nurse): Promise<any> {
        return super.addEntity(myNurse, 'nurse');
    }

    getNurses(): Promise<any> {
        return super.getEntity('nurse');
    }

}
