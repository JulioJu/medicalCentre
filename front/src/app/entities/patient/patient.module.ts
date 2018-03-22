import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppPersonModule } from '../person/person.module';

import  {
    PatientComponent,
    PatientDetailComponent,
    PatientService,
    PATIENT_ROUTE } from './';

const ENTITY_STATES = [
    ...PATIENT_ROUTE
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ENTITY_STATES),
        AppPersonModule
    ],
    declarations: [
        PatientComponent,
        PatientDetailComponent
    ],
    providers: [PatientService]
})
export class AppPatientModule { }
