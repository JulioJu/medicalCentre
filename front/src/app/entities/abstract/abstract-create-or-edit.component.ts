import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { FindAndModifyWriteOpResultObject, } from 'mongodb';

import {
    QuestionBase,
    QuestionControlService,
    TriggerRemoveBanner,
    ShowMongoError,
    ShowError,
    CatchAndDisplayError
} from './../../shared';

import { IAbstract } from
    '../entities-interface/abstract.interface';
import { IAbstractCreateOrEditQuestionsService } from
    './abstract-create-or-edit.questions.service';
import { AbstractService } from './abstract.service';

export abstract class AbstractCreateOrEditComponent implements OnInit {

    private questions: Array<QuestionBase<string>> = [];
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
                (ShowMongoError));
    }

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
        return new Promise((res: (value: FormGroup) => void): void => {
            console.info('Try to load the data of the form with id', id);
            this.abstractService
            .find(id)
            .subscribe((abstractResponse: HttpResponse<IAbstract>) => {
                let formDatas: IAbstract | null;
                formDatas = abstractResponse.body;
                // TODO display "loading"
                if (formDatas) {
                    this.qcs.toFormGroup(this.questions, formDatas)
                        .then(res);
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
        return this.qcs.toFormGroup(this.questions, undefined);
    }

    public ngOnInit(): void {

        this.route.params.subscribe((params: Params) => {
            if (params.id) {
                this.loadFromRouteParam(params.id as string)
                    .then(((form: FormGroup): void => {
                        this.instantiateForm(form);
                    }));
            } else {
                this.loadFromSessionStorage()
                    .then(((form: FormGroup): void => {
                        this.instantiateForm(form);
                    }));
            }
        });

    }

}
