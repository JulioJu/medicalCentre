import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppEntityModule } from '../entity/entity.module';
import { AppPersonModule } from '../person/person.module';

import  {
    NurseComponent,
    NurseDetailComponent,
    NurseDeleteComponent,
    NurseService,
    NURSE_ROUTE } from './';

const ENTITY_STATES = [
    ...NURSE_ROUTE
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ENTITY_STATES),
        AppEntityModule,
        AppPersonModule
    ],
    declarations: [
        NurseComponent,
        NurseDetailComponent,
        NurseDeleteComponent
    ],
    providers: [NurseService]
})
export class AppNurseModule { }
