import { OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { IHttpErrorResponseFormPutError } from
    '../../shared/form-rest-api/ihttperrorresponseformputerror';

import {
    QuestionBase,
    QuestionControlService
}     from './../../shared';

import { IAbstract } from
    '../entities-interface/abstract.interface';

import { IAbstractFormQuestionService } from './abstract.questions.service';
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
        service: IAbstractFormQuestionService
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

    private readonly showError = (docErrorForm: HTMLElement,
        err: IHttpErrorResponseFormPutError): void => {

        docErrorForm.appendChild(
            document.createTextNode(
                'ERROR: ' + err.error.error_message
            )
        );
        docErrorForm.style.display = 'block';
    }

    private readonly removeErrorBanner = (docErrorForm: HTMLElement): void => {
        while (docErrorForm.firstChild) {
            docErrorForm
                .removeChild(docErrorForm.firstChild);
            docErrorForm.style.display = 'none';
        }
    }

    protected onSubmit(): void {
        const abstract: IAbstract = this.form.value as IAbstract;
        console.debug('You try to save or update:', abstract);
        this.abstractService
            .insertOrUpdate(abstract)
            // tslint:disable-next-line:no-any
            .subscribe((response: any) => {
                // if (response.ok)
                console.info(response);
                sessionStorage.removeItem(this.formRoute);
                // tslint:disable-next-line:no-unsafe-any
                if (response && response.body && response.body) {
                    this.router.navigate([
                        // tslint:disable-next-line:restrict-plus-operands
                        '/' + this.entityName + '/' +
                        // tslint:disable-next-line:no-unsafe-any
                        response.body.entity._id
                    ])
                    .catch((e: Error) => console.error(e));
                }
            },
                (err: IHttpErrorResponseFormPutError) => {
                    console.error('ERROR', err);
                    const docErrorForm: HTMLElement | null = document
                        .getElementById('errorForm');
                    if (docErrorForm) {
                        if (docErrorForm.firstChild) {
                            this.removeErrorBanner(docErrorForm);
                            window.setTimeout(() => {
                                this.showError(docErrorForm, err);
                            // tslint:disable-next-line:no-magic-numbers
                            } , 50);
                        } else {
                            this.showError(docErrorForm, err);
                        }
                    }
                }
            );
    }

    protected reset(): void {
        const docErrorForm: HTMLElement | null =
            document.getElementById('errorForm');
        if (docErrorForm && docErrorForm.firstChild) {
            this.removeErrorBanner(docErrorForm);
        }
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
