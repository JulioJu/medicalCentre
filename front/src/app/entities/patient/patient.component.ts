import { Component } from '@angular/core';

import { AbstractComponent } from '../abstract';
import { PatientService } from './patient.service';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html'
})
export class PatientComponent extends AbstractComponent {

    protected readonly entityNameVar: string = 'patient';

    public constructor(patientService: PatientService) {
        super(patientService);
    }

}
