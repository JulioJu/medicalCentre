import { Component, OnInit } from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import {
    QuestionBase,
    QuestionControlService
}     from './../../shared';
import { PatientFormQuestionProtoComponent } from
    './patient-form-questions-proto.service';

@Component({
    styles: [`
        .form-row{
            margin-top: 10px;
        }`],
    templateUrl: './../../shared/form/dynamic-form.component.html',
    providers:  [
        QuestionControlService,
        PatientFormQuestionProtoComponent
    ]
})
export class PatientCreateOrEditProtoComponent implements OnInit {

    questions: QuestionBase<any>[] = [];
    form: FormGroup;
    payLoad = '';

    constructor(
        private readonly qcs: QuestionControlService,
        service: PatientFormQuestionProtoComponent
    ) {
        this.questions = service.getQuestions();
    }

    ngOnInit(): void {
        this.form = this.qcs.toFormGroup(this.questions);
    }

    onSubmit(): void {
        this.payLoad = JSON.stringify(this.form.value);
    }

}
