import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PatientService } from './patient.service';

import { AbstractDeleteComponent } from '../abstract';

@Component({
    selector: 'app-patient-delete',
    templateUrl: './patient-delete.component.html'
})
export class PatientDeleteComponent extends
        AbstractDeleteComponent implements OnInit {

    protected readonly entityNameVar = 'patient';

    constructor(patientService: PatientService,
        route: ActivatedRoute,
        router: Router) {
        super(patientService, route, router);
    }

    ngOnInit(): void {
        super.ngOnInitAbstract();
    }

}
