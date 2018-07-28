import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import {
    QuestionBase,
    QuestionControlService
}     from './../../shared';

import { IPatient } from
    '../entities-interface/patient.interface';

import { PatientFormQuestionService } from
    './patient-form-questions.service';
import { PatientService } from './patient.service';

@Component({
    styles: [`
        .form-row{
            margin-top: 10px;
        }`],
    templateUrl: './../../shared/form/dynamic-form.component.html',
    providers:  [
        QuestionControlService,
        PatientFormQuestionService
    ]
})
export class PatientCreateOrEditComponent implements OnInit, AfterViewInit {

    questions: QuestionBase<any>[] = [];
    form: FormGroup;
    payLoad = '';
    formRoute: string;

    constructor(
        router: Router,
        private readonly qcs: QuestionControlService,
        private readonly patientService: PatientService,
        service: PatientFormQuestionService
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
        const patient = this.form.value as IPatient;
        console.debug('You try to save or update:', patient);
        this.patientService
            .insertOrUpdate(patient)
            .subscribe((response) => {
                if (!response.ok) {
                    const responseErrored = response as HttpErrorResponse;
                    console.debug('We have an error here.',
                        responseErrored.error);
                } else {
                    // TODO. When duplicated key, don't send a JSON object.
                    // Test, by add twice the same form !
                    console.log(response);
                }
            });
        sessionStorage.removeItem(this.formRoute);
    }

}
