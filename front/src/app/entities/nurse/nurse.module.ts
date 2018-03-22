import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppAbstractModule } from '../abstract';
import { AppPersonModule } from '../person';
import { NurseComponent } from './nurse.component';
import { NurseDetailComponent } from './nurse-detail.component';
import { NurseService } from './nurse.service';
import { NURSE_ROUTE } from './nurse.route';

const ENTITY_STATES = [
    ...NURSE_ROUTE
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ENTITY_STATES),
        AppAbstractModule,
        AppPersonModule
    ],
    declarations: [
        NurseComponent,
        NurseDetailComponent
    ],
    providers: [NurseService]
})
export class AppNurseModule { }
