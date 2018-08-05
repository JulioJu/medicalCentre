import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PatientService } from './patient.service';

import { AbstractDetailComponent } from '../abstract';

@Component({
    selector: 'app-patient-detail',
    templateUrl: './patient-detail.component.html'
})
export class PatientDetailComponent extends AbstractDetailComponent {

    protected readonly entityNameVar = 'patient';

    constructor(patientService: PatientService, route: ActivatedRoute) {
        super(patientService, route);
    }

}
