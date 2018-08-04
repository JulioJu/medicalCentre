import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPatient } from '../entities-interface/patient.interface';
import { PatientService } from './patient.service';

import { AbstractDetailComponent } from '../abstract';

@Component({
    selector: 'app-patient-detail',
    templateUrl: './patient-detail.component.html'
})
export class PatientDetailComponent extends AbstractDetailComponent {

    protected readonly entityNameVar = 'patient';

    entity: IPatient | null;

    constructor(patientService: PatientService, route: ActivatedRoute) {
        super(patientService, route);
    }

}
