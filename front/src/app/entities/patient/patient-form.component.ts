import { Component, OnInit } from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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
export class PatientCreateOrEditComponent implements OnInit {

    questions: QuestionBase<any>[] = [];
    form: FormGroup;
    payLoad = '';

    constructor(
        private readonly qcs: QuestionControlService,
        private readonly patientService: PatientService,
        service: PatientFormQuestionService
    ) {
        this.questions = service.getQuestions();
    }

    ngOnInit(): void {
        this.form = this.qcs.toFormGroup(this.questions);
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

    }

}
