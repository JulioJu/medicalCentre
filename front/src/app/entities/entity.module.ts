import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PatientModule } from './patient/patient.module';

@NgModule({
    imports: [
        PatientModule,
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntityModule {}
