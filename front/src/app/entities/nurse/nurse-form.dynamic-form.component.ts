import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AbstractCreateOrEditComponent } from
    '../abstract/abstract-form.dynamic-form.component';

import { QuestionControlService }     from './../../shared';

import { NurseFormQuestionService } from
    './nurse-form.questions.service';
import { NurseService } from './nurse.service';

@Component({
    styles: [`
        .form-row{
            margin-top: 10px;
        }`],
    templateUrl: './../../shared/form/dynamic-form.component.html',
    providers:  [
        QuestionControlService,
        NurseFormQuestionService
    ]
})
export class NurseCreateOrEditComponent extends AbstractCreateOrEditComponent {

    protected entityName: string = 'nurse';

    public constructor(
        route: ActivatedRoute,
        router: Router,
        qcs: QuestionControlService,
        nurseService: NurseService,
        service: NurseFormQuestionService
    ) {
        super(route, router, qcs, nurseService, service);
    }

}
