import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppAbstractModule } from '../abstract';
import { PersonComponent } from './person.component';

@NgModule({
    imports: [
        BrowserModule,
        AppAbstractModule
    ],
    declarations: [
        PersonComponent
    ],
    exports: [
        PersonComponent
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppPersonModule {}
