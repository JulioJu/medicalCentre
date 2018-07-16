import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule }          from '@angular/forms';

import { AppEntityModule } from '../entity/entity.module';
import { AppFormModule } from '../../shared/form/form.module';
import { AppPersonModule } from '../person/person.module';

import  {
    PatientComponent,
    PatientDetailComponent,
    PatientCreateOrEditProtoComponent,
    PatientCreateOrEditComponent,
    PatientDeleteComponent,
    PatientService } from './';

import { PATIENT_ROUTE } from './patient.route';

const ENTITY_STATES = [
    ...PATIENT_ROUTE
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ENTITY_STATES),
        AppEntityModule,
        AppFormModule,
        AppPersonModule,
        ReactiveFormsModule
    ],
    declarations: [
        PatientComponent,
        PatientDetailComponent,
        PatientCreateOrEditProtoComponent,
        PatientCreateOrEditComponent,
        PatientDeleteComponent
    ],
    providers: [PatientService]
})
export class AppPatientModule { }
