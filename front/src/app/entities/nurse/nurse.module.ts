import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppPersonModule } from '../person/person.module';
import  {
    NurseComponent,
    NurseDetailComponent,
    NurseService,
    NURSE_ROUTE } from './';

const ENTITY_STATES = [
    ...NURSE_ROUTE
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ENTITY_STATES),
        AppPersonModule
    ],
    declarations: [
        NurseComponent,
        NurseDetailComponent
    ],
    providers: [NurseService]
})
export class AppNurseModule { }
