import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppPatientModule } from './patient/patient.module';
import { AppNurseModule } from './nurse/nurse.module';

@NgModule({
    imports: [
        AppPatientModule,
        AppNurseModule
    ],
    declarations: [
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppEntityModule {}
