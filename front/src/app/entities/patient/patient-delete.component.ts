import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PatientService } from './patient.service';

import { AbstractDeleteComponent } from '../abstract';

@Component({
    selector: 'app-patient-delete',
    templateUrl: './patient-delete.component.html'
})
export class PatientDeleteComponent extends
        AbstractDeleteComponent {

    protected readonly entityNameVar: string = 'patient';

    public constructor(patientService: PatientService,
        route: ActivatedRoute,
        router: Router) {
        super(patientService, route, router);
    }
}
