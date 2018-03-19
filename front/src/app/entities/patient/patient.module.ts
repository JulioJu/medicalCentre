import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { PatientService } from './patient.service';
import { PATIENT_ROUTE } from './patient.route';
import { AbstractDirectiveComponent } from '../abstract';

const ENTITY_STATES = [
    PATIENT_ROUTE
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AbstractDirectiveComponent,
        PatientComponent
    ],
    providers: [PatientService]
})
export class PatientModule { }
