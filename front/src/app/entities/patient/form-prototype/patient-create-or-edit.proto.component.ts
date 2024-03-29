import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import {
    QuestionBase,
    QuestionControlService,
    ShowError
}     from './..//../../shared';
import { PatientFormQuestionProtoComponent } from
    './patient-create-or-edit.proto.questions.service';

import { IAbstract } from '../../entities-interface/abstract.interface';

@Component({
    styles: [`
        .form-row{
            margin-top: 10px;
        }`],
    templateUrl: './patient-create-or-edit.proto.component.html',
    providers:  [
        QuestionControlService,
        PatientFormQuestionProtoComponent
    ]
})
export class PatientCreateOrEditProtoComponent implements OnInit {

    public questions: Array<QuestionBase<string>> = [];
    public form: FormGroup;
    public payLoad: string = '';
    public formRoute: string;

    public constructor(
        router: Router,
        private readonly qcs: QuestionControlService,
        service: PatientFormQuestionProtoComponent
    ) {
        this.questions = service.getQuestions;
        this.formRoute = router.url;
    }

    public ngOnInit(): void {
        this.qcs.toFormGroup(this.questions)
            .then((formRetrieved: FormGroup): void => {
                this.form = formRetrieved;
                if (sessionStorage.getItem(this.formRoute)) {
                    const abstractJSON: string = sessionStorage
                        .getItem(this.formRoute) as string;
                    // I've tested. If the JSON doesn't match the form, no bugs.
                    this.form.setValue(JSON.parse(abstractJSON) as IAbstract);
                    Object.keys(this.form.controls)
                        .forEach((field: string) => {
                            const control: AbstractControl | null =
                                this.form.get(field);
                            if (control && control.value as string
                                    && (control.value as string).length > 0) {
                                control.markAsTouched({ onlySelf: true });
                            }
                    });
                    this.form.valueChanges.subscribe((val: string) => {
                        sessionStorage
                            .setItem(this.formRoute, JSON.stringify(val));
                    });
                }
            })
            .catch((e: Error) => {
                console.error(e);
                ShowError(e, 'Error when loading form.');
            });
    }

    public onSubmit(): void {
        this.payLoad = JSON.stringify(this.form.value);
        sessionStorage.removeItem(this.formRoute);
    }

}
