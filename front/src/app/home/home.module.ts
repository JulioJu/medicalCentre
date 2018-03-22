import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    HomeComponent,
    HOME_ROUTE } from './';

@NgModule({
    imports: [
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppHomeMOdule {}
