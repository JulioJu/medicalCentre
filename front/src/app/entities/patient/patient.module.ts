import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppEntityModule } from '../entity/entity.module';
import { AppPersonModule } from '../person/person.module';

import  {
    PatientComponent,
    PatientDetailComponent,
    PatientDeleteComponent,
    PatientService,
    PATIENT_ROUTE } from './';

const ENTITY_STATES = [
    ...PATIENT_ROUTE
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ENTITY_STATES),
        AppEntityModule,
        AppPersonModule
    ],
    declarations: [
        PatientComponent,
        PatientDetailComponent,
        PatientDeleteComponent
    ],
    providers: [PatientService]
})
export class AppPatientModule { }
