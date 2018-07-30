import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { Router } from '@angular/router';

import {
    QuestionBase,
    QuestionControlService
}     from './../../shared';
import { PatientFormQuestionProtoComponent } from
    './patient-form-proto.questions.service';

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
export class PatientCreateOrEditProtoComponent implements OnInit,
    AfterViewInit {

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
            const patientJSON = sessionStorage
                .getItem(this.formRoute) as string;
            // TODO test if patienJSON is well formed (castable in type
            // IPatient)
            this.form.setValue(JSON.parse(patientJSON));
        }
    }

    ngAfterViewInit(): void {
        this.form.valueChanges.subscribe(val => {
            sessionStorage.setItem(this.formRoute, JSON.stringify(val));
        });
    }

    onSubmit(): void {
        this.payLoad = JSON.stringify(this.form.value);
        sessionStorage.removeItem(this.formRoute);
    }

}
