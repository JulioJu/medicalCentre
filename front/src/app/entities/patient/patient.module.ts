import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppAbstractModule } from '../abstract';
import { AppPersonModule } from '../person';
import { PatientComponent } from './patient.component';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientService } from './patient.service';
import { PATIENT_ROUTE } from './patient.route';

const ENTITY_STATES = [
    ...PATIENT_ROUTE
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ENTITY_STATES),
        AppAbstractModule,
        AppPersonModule
    ],
    declarations: [
        PatientComponent,
        PatientDetailComponent
    ],
    providers: [PatientService]
})
export class AppPatientModule { }
