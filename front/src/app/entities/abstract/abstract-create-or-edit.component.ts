import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';

// tested with `tsc -p tsconfig.json'
// This import is not generated in the corresponding javascript file.
// tslint:disable:no-implicit-dependencies
import { MongoError, FindAndModifyWriteOpResultObject } from 'mongodb';
import * as mongoose from 'mongoose';

import {
    QuestionBase,
    QuestionControlService,
    TriggerRemoveBanner,
    ShowError,
    CatchAndDisplayError
} from './../../shared';

import { IAbstract } from
    '../entities-interface/abstract.interface';
import { IAbstractCreateOrEditQuestionsService } from
    './abstract-create-or-edit.questions.service';
import { AbstractService } from './abstract.service';

export abstract class AbstractCreateOrEditComponent implements OnInit {

    private readonly questions: Array<QuestionBase<string>> = [];
    private form: FormGroup;
    private readonly formRoute: string;
    protected abstract entityName: string;

    public constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly qcs: QuestionControlService,
        private readonly abstractService: AbstractService,
        service: IAbstractCreateOrEditQuestionsService
    ) {
        this.questions = service.getQuestions;
        this.formRoute = router.url;
    }

    /* We don't parse mongoose.ValidationError,
     *  as lot of checks are done in front
     */
    // See also ../../../../../back/app/entities/abstract/abstract.route.ts
    private readonly ShowValidationError = (err: HttpErrorResponse): void => {
        console.error(err);
        let details = 'unknown';
        // tslint:disable-next-line:no-magic-numbers
        if (err.status === 400) {
            // Errors that I manage me in my code relative to
            // the Mongo DB native NodeJS Driver  is not managed
            details = 'Form not valid';
            if ((err.error as MongoError).errmsg
                    // tslint:disable-next-line:no-magic-numbers
                    && ((err.error as MongoError).code === 11000
                        // tslint:disable-next-line:no-magic-numbers
                        || (err.error as MongoError).code === 11001)) {
                // Duplicate key error
                details += (err.error as MongoError).errmsg;
            } else if ((err.error as mongoose.Error.ValidationError).errors) {
                details += (err.error as mongoose.Error.ValidationError).errors;
            }
        // tslint:disable-next-line:no-magic-numbers
        } else if (err.status === 502 && (err.error as MongoError).errmsg) {
            details += `Error with the mongo service: is it started? ` +
                `${(err.error as MongoError).errmsg}`;
        }
        ShowError(
            `code: ${err.status}  status:${err.statusText} Details:${details}`);
    }

    protected onSubmit(): void {
        const abstract: IAbstract = this.form.value as IAbstract;
        console.debug('You try to save or update:', abstract);
        this.abstractService
            .insertOrUpdate(abstract)
            .subscribe(
                // tslint:disable-next-line:max-line-length
                (response: HttpResponse<FindAndModifyWriteOpResultObject<IAbstract>>) => {
                    sessionStorage.removeItem(this.formRoute);
                    if (response && response.body && response.body.value) {
                        this.router.navigate([
                            // tslint:disable-next-line:restrict-plus-operands
                            '/' + this.entityName + '/' +
                            response.body.value._id
                        ])
                        .catch(CatchAndDisplayError);
                    } else {
                        ShowError('Error unknown in request');
                    }
                },
                (this.ShowValidationError)); }

    protected reset = (): void => {
        TriggerRemoveBanner();
    }

    private instantiateForm(form: FormGroup): void {
        this.form = form;
        this.form.valueChanges.subscribe((val: string) => {
            sessionStorage.setItem(this.formRoute, JSON.stringify(val));
        });
    }

    /** Load from node server */
    private async loadFromRouteParam(id: string): Promise<FormGroup> {
        return new Promise((res: (value: FormGroup) => void,
                rej: (value: FormData) => void): void => {
            console.info('Try to load the data of the form with id', id);
            this.abstractService
            .find(id)
            .subscribe((abstractResponse: HttpResponse<IAbstract>) => {
                let formDatas: IAbstract | null;
                formDatas = abstractResponse.body;
                // TODO display "loading"
                if (formDatas) {
                    this.qcs.toFormGroup(this.questions, formDatas)
                        .then(res)
                        .catch(rej);
                } else {
                    // TODO display this error
                    throw new Error('Could not load the data with id "' + id +
                        '"(nothing found)');
                }
            });
        });
    }

    /** Browser Session Storage */
    private async loadFromSessionStorage(): Promise<FormGroup> {
        const sessionStorageForm: string = sessionStorage
            .getItem(this.formRoute) as string;
        if (sessionStorageForm) {
            // TODO maybe try catch and display error in front
            // if abstractJSON is not a valid JSON.
            const formDatas: IAbstract =
                JSON.parse(sessionStorageForm) as IAbstract;
            return this.qcs.toFormGroup(this.questions, formDatas);
        }
        return this.qcs.toFormGroup(this.questions);
    }

    public ngOnInit(): void {

        this.route.params.subscribe((params: Params) => {
            if (params.id) {
                this.loadFromRouteParam(params.id as string)
                    .then(((form: FormGroup): void => {
                        this.instantiateForm(form);
                    }))
                    .catch((e: string) => {
                        ShowError('Error when loading form.');
                        console.error(e);
                    });
            } else {
                this.loadFromSessionStorage()
                    .then(((form: FormGroup): void => {
                        this.instantiateForm(form);
                    }))
                    .catch((e: string) => {
                        ShowError('Error when loading form.');
                        console.error(e);
                    });
            }
        });

    }

}
