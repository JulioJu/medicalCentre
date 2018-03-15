import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppHomeComponent } from './home.component';
import { HOME_ROUTE } from './home.route';

@NgModule({
    imports: [
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        AppHomeComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppHomeMOdule {}
