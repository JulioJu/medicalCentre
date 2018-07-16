import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }          from '@angular/forms';

import { DynamicFormQuestionComponent } from '../';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        DynamicFormQuestionComponent
    ],
    exports: [
        DynamicFormQuestionComponent
    ]
})
export class AppFormModule { }
