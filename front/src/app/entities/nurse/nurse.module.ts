import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppPersonModule } from '../person';
import { NurseComponent } from './nurse.component';
import { NurseService } from './nurse.service';
import { PATIENT_ROUTE } from './nurse.route';

const ENTITY_STATES = [
    PATIENT_ROUTE
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ENTITY_STATES),
        AppPersonModule
    ],
    declarations: [
        NurseComponent
    ],
    providers: [NurseService]
})
export class AppNurseModule { }
