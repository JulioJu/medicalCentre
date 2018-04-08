import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }          from '@angular/forms';

import { DynamicFormComponent, DynamicFormQuestionComponent } from '../';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        DynamicFormComponent,
        DynamicFormQuestionComponent
    ],
    exports: [
        DynamicFormComponent,
        DynamicFormQuestionComponent
    ]
})
export class AppFormModule { }
