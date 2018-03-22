import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AbstractDirectiveComponent } from './abstract.directive.component';
import { AbstractDetailDirectiveComponent }
    from './abstract-detail.directive.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        AbstractDirectiveComponent,
        AbstractDetailDirectiveComponent
    ],
    exports: [
        AbstractDirectiveComponent,
        AbstractDetailDirectiveComponent
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppAbstractModule {}
