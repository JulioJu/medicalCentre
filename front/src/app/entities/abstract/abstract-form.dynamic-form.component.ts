import { OnInit } from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import {
    QuestionBase,
    QuestionControlService
}     from './../../shared';

import { IAbstract } from
    '../entities-interface/abstract.interface';

import { IAbstractFormQuestionService } from './abstract.questions.service';
import { AbstractService } from './abstract.service';

export abstract class AbstractCreateOrEditComponent
    <iabstractType extends IAbstract> implements OnInit {

    questions: QuestionBase<any>[] = [];
    form: FormGroup;
    formRoute: string;

    constructor(
        router: Router,
        private readonly qcs: QuestionControlService,
        private readonly abstractService: AbstractService,
        service: IAbstractFormQuestionService
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
        const abstract = this.form.value as iabstractType;
        console.debug('You try to save or update:', abstract);
        this.abstractService
            .insertOrUpdate(abstract)
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
