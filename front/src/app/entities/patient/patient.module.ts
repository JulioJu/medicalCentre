import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { PatientService } from './patient.service';
import { PATIENT_ROUTE } from './patient.route';

const ENTITY_STATES = [
    PATIENT_ROUTE
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [PatientComponent],
    providers: [PatientService]
})
export class PatientModule { }
