import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AbstractDirectiveComponent } from './abstract-directive.component';

@NgModule({
    imports: [
    ],
    declarations: [
        AbstractDirectiveComponent
    ],
    exports: [
        AbstractDirectiveComponent
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppAbstractModule {}
