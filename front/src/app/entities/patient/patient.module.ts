import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
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
    PatientService,
    MapOpenLayersComponent,
    MapLeafletComponent
} from './';

import { PATIENT_ROUTE } from './patient.route';

const ENTITY_STATES: Routes = [
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
        PatientDeleteComponent,
        MapOpenLayersComponent,
        MapLeafletComponent
    ],
    providers: [PatientService]
})
export class AppPatientModule { }
