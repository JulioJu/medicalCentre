import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AbstractCreateOrEditComponent } from
    '../abstract/abstract-create-or-edit.component';

import { QuestionControlService }     from './../../shared';

import { NurseCreateOrEditQuestionsService } from
    './nurse-create-or-edit.questions.service';
import { NurseService } from './nurse.service';

@Component({
    styles: [`
        .form-row{
            margin-top: 10px;
        }`],
    templateUrl: './../../shared/form/dynamic-form.component.html',
    providers:  [
        QuestionControlService,
        NurseCreateOrEditQuestionsService
    ]
})
export class NurseCreateOrEditComponent extends AbstractCreateOrEditComponent {

    protected entityName: string = 'nurse';

    public constructor(
        route: ActivatedRoute,
        router: Router,
        qcs: QuestionControlService,
        nurseService: NurseService,
        service: NurseCreateOrEditQuestionsService
    ) {
        super(route, router, qcs, nurseService, service);
    }

}
