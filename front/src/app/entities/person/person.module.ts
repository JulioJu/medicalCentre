import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppEntityModule } from '../entity/entity.module';
import { PersonComponent, PersonDetailComponent } from './';

@NgModule({
    imports: [
        BrowserModule,
        AppEntityModule
    ],
    declarations: [
        PersonComponent,
        PersonDetailComponent
    ],
    exports: [
        PersonComponent,
        PersonDetailComponent
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppPersonModule {}
