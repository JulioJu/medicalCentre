import { OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
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

    private convertToFormGroup(rowTable: IAbstract): void {
        const rowTableNotNull: IAbstract = rowTable;
        const rowTableCasted: IAbstract = {_id: ''};
        Object.keys(this.form.value as string)
        .forEach((key: string) => {
            rowTableCasted[key] = rowTableNotNull[key];
        });
        try {
            this.form.setValue(rowTableCasted);
        } catch {
            // Thanks the code inside `Object.key…' above
            // this code below should not be used.
            console.error(this.form);
            console.error('doesn\'t match');
            console.error(rowTableCasted);
        }
        Object.keys(this.form.controls)
        .forEach((field: string) => {
            const control: AbstractControl | null = this.form.get(field);
            if (control
                && control.value
                && (control.value as string[]).length > 0) {
                control.markAsTouched({ onlySelf: true });
            }
        });
    }

    /** Browser Session Storage */
    private loadFromSessionStorage(): void {
        if (sessionStorage.getItem(this.formRoute)) {
            const abstractJSON: string = sessionStorage
                .getItem(this.formRoute) as string;
            // TODO maybe try catch and display error in front
            // if abstractJSON is not a valid JSON.
            const rowTable: IAbstract = JSON.parse(abstractJSON) as IAbstract;
            this.convertToFormGroup(rowTable);
        }
    }

    private loadFromRouteParam(id: string): void {
        console.info('Try to load the rowTable with id', id);
        this.abstractService
        .find(id)
        .subscribe((abstractResponse: HttpResponse<IAbstract>) => {
            console.debug('coucou', abstractResponse);
            let rowTable: IAbstract | null;
            rowTable = abstractResponse.body;
            if (rowTable) {
                this.convertToFormGroup(rowTable);
            } else {
                // TODO display this error
                console.error('Could not load the data with id "', id,
                    '"(nothing found)');
            }
        });
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

    public ngOnInit(): void {
        this.form = this.qcs.toFormGroup(this.questions);

        this.route.params.subscribe((params: Params) => {
            if (params.id) {
                this.loadFromRouteParam(params.id as string);
            } else {
                this.loadFromSessionStorage();
            }
            this.form.valueChanges.subscribe((val: string) => {
                sessionStorage.setItem(this.formRoute, JSON.stringify(val));
            });
        });

    }

}
