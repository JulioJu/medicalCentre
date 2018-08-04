import { Component } from '@angular/core';

import { AbstractComponent } from '../abstract';
import { IPatient } from '../entities-interface/patient.interface';
import { PatientService } from './patient.service';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html'
})
export class PatientComponent extends AbstractComponent {

    protected readonly entityNameVar = 'patient';

    protected entityArray: IPatient[] | null;

    constructor(patientService: PatientService) {
        super(patientService);
    }

}
