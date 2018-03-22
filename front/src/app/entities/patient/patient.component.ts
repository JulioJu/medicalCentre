import { Component, OnInit } from '@angular/core';
import { PatientService } from './patient.service';
import { AbstractInheritanceComponent } from '../abstract';
import { IPatient } from '../entities-interface/patient.interface';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html'
})
export class PatientComponent extends AbstractInheritanceComponent
        implements OnInit {

    protected readonly entityNameVar = 'patient';

    protected entityArray: IPatient[] | null;

    constructor(patientService: PatientService) {
        super(patientService);
    }

    ngOnInit(): void {
        super.ngOnInitAbstract();
    }

}
