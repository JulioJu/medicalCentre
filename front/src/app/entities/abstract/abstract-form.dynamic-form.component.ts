import { OnInit } from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { IFormPutSuccess } from '../../shared/form-rest-api/iformputsuccess';
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

    private questions: QuestionBase<any>[] = [];
    private form: FormGroup;
    private formRoute: string;
    protected abstract entityName: string;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly qcs: QuestionControlService,
        private readonly abstractService: AbstractService,
        service: IAbstractFormQuestionService
    ) {
        this.questions = service.getQuestions();
        this.formRoute = router.url;
    }

    private convertToFormGroup(rowTable: IAbstract): void {
        const rowTableNotNull = rowTable;
        const rowTableCasted: IAbstract = {_id: ''};
        Object.keys(this.form.value)
        .forEach(key => {
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
        .forEach(field => {
            const control = this.form.get(field);
            if (control
                && control.value
                && control.value.length > 0) {
                control.markAsTouched({ onlySelf: true });
            }
        });
    }

    private loadFromSessionStorage(): void {
        if (sessionStorage.getItem(this.formRoute)) {
            const abstractJSON = sessionStorage
                .getItem(this.formRoute) as string;
            // TODO maybe try catch and display error in front
            // if abstractJSON is not a valid JSON.
            const rowTable = JSON.parse(abstractJSON);
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

    private showError(docErrorForm: HTMLElement,
        err: IHttpErrorResponseFormPutError): void {

        docErrorForm.appendChild(
            document.createTextNode(
                'ERROR: ' + err.error.error_message
            )
        );
        docErrorForm.style.display = 'block';
    }

    private removeErrorBanner(docErrorForm: HTMLElement): void {
        while (docErrorForm.firstChild) {
            docErrorForm
                .removeChild(docErrorForm.firstChild);
            docErrorForm.style.display = 'none';
        }
    }

    protected onSubmit(): void {
        const abstract = this.form.value as IAbstract;
        console.debug('You try to save or update:', abstract);
        this.abstractService
            .insertOrUpdate(abstract)
            .subscribe((response: HttpResponse<IFormPutSuccess>) => {
                // if (response.ok)
                console.info(response);
                sessionStorage.removeItem(this.formRoute);
                if (response && response.body && response.body) {
                    this.router.navigate([
                        '/' + this.entityName + '/' +
                        response.body.entity._id
                    ]);
                }
            },
                (err: IHttpErrorResponseFormPutError) => {
                    console.error('ERROR', err);
                    const docErrorForm = document.getElementById('errorForm');
                    if (docErrorForm) {
                        if (docErrorForm.firstChild) {
                            this.removeErrorBanner(docErrorForm);
                            window.setTimeout(() => {
                                this.showError(docErrorForm, err);
                            } , 50);
                        } else {
                            this.showError(docErrorForm, err);
                        }
                    }
                }
            );
    }

    protected reset(): void {
        const docErrorForm = document.getElementById('errorForm');
        if (docErrorForm && docErrorForm.firstChild) {
            this.removeErrorBanner(docErrorForm);
        }
    }

    public ngOnInit(): void {
        this.form = this.qcs.toFormGroup(this.questions);

        this.route.params.subscribe(params => {
            if (params.id) {
                this.loadFromRouteParam(params.id);
            } else {
                this.loadFromSessionStorage();
            }
            this.form.valueChanges.subscribe(val => {
                sessionStorage.setItem(this.formRoute, JSON.stringify(val));
            });
        });

    }

}
