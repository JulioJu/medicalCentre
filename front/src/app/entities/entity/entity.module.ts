import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EntityComponent } from './entity.component';
import { EntityDetailComponent } from './entity-detail.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        EntityComponent,
        EntityDetailComponent
    ],
    exports: [
        EntityComponent,
        EntityDetailComponent
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppEntityModule {}
