import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule }          from '@angular/forms';

import { AppEntityModule } from '../entity/entity.module';
import { AppFormModule } from '../../shared/form/form.module';
import { AppPersonModule } from '../person/person.module';

import  {
    NurseComponent,
    NurseDetailComponent,
    NurseCreateOrEditComponent,
    NurseDeleteComponent,
    NurseService } from './';

import { NURSE_ROUTE } from './nurse.route';

const ENTITY_STATES: Routes = [
    ...NURSE_ROUTE
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
        NurseComponent,
        NurseDetailComponent,
        NurseCreateOrEditComponent,
        NurseDeleteComponent
    ],
    providers: [NurseService]
})
export class AppNurseModule { }
