import { Component, OnInit } from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { Router } from '@angular/router';

import {
    QuestionBase,
    QuestionControlService
}     from './..//../../shared';
import { PatientFormQuestionProtoComponent } from
    './patient-form-proto.questions.service';

@Component({
    styles: [`
        .form-row{
            margin-top: 10px;
        }`],
    templateUrl: './patient-form-proto.dynamic-form.component.html',
    providers:  [
        QuestionControlService,
        PatientFormQuestionProtoComponent
    ]
})
export class PatientCreateOrEditProtoComponent implements OnInit {

    questions: QuestionBase<any>[] = [];
    form: FormGroup;
    payLoad = '';
    formRoute: string;

    constructor(
        router: Router,
        private readonly qcs: QuestionControlService,
        service: PatientFormQuestionProtoComponent
    ) {
        this.questions = service.getQuestions();
        this.formRoute = router.url;
    }

    ngOnInit(): void {
        this.form = this.qcs.toFormGroup(this.questions);
        if (sessionStorage.getItem(this.formRoute)) {
            const abstractJSON = sessionStorage
                .getItem(this.formRoute) as string;
            // I've tested. If the JSON doesn't match the form, no bugs.
            this.form.setValue(JSON.parse(abstractJSON));
            Object.keys(this.form.controls)
                .forEach(field => {
                    const control = this.form.get(field);
                    if (control && control.value && control.value.length > 0) {
                        control.markAsTouched({ onlySelf: true });
                    }
            });
        }
        this.form.valueChanges.subscribe(val => {
            sessionStorage.setItem(this.formRoute, JSON.stringify(val));
        });
    }

    onSubmit(): void {
        this.payLoad = JSON.stringify(this.form.value);
        sessionStorage.removeItem(this.formRoute);
    }

}
