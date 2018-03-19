import { Component, OnInit } from '@angular/core';
import { PatientService } from './patient.service';
import { AbstractComponent } from '../abstract';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['../abstract/abstract.component.css']
})
export class PatientComponent extends AbstractComponent implements OnInit {

    protected readonly entityNameVar = 'Patient';

    constructor(patientService: PatientService) {
        super(patientService);
    }

    ngOnInit(): void {
        super.ngOnInitAbstract();
    }

}
