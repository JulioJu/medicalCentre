import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
    EntityComponent,
    EntityDetailComponent,
    EntityDeleteComponent
} from './';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        EntityComponent,
        EntityDetailComponent,
        EntityDeleteComponent
    ],
    exports: [
        EntityComponent,
        EntityDetailComponent,
        EntityDeleteComponent
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppEntityModule {}
