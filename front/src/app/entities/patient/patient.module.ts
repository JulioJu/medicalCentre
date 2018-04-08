import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppEntityModule } from '../entity/entity.module';
import { AppFormModule } from '../../shared/form/form.module';
import { AppPersonModule } from '../person/person.module';

import  {
    PatientComponent,
    PatientDetailComponent,
    PatientCreateOrEditComponent,
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
        AppFormModule,
        AppPersonModule
    ],
    declarations: [
        PatientComponent,
        PatientDetailComponent,
        PatientCreateOrEditComponent,
        PatientDeleteComponent
    ],
    providers: [PatientService]
})
export class AppPatientModule { }
