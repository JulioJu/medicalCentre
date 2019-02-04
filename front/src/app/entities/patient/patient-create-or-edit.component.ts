import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AbstractCreateOrEditComponent } from
    '../abstract/abstract-create-or-edit.component';

import { QuestionControlService }     from './../../shared';

import { PatientCreateOrEditQuestionsService } from
    './patient-create-or-edit.questions.service';
import { PatientService } from './patient.service';

@Component({
    styles: [`
        .form-row{
            margin-top: 10px;
        }`],
    templateUrl: './../../shared/form/dynamic-form.component.html',
    providers:  [
        QuestionControlService,
        PatientCreateOrEditQuestionsService
    ]
})
export class PatientCreateOrEditComponent
        extends AbstractCreateOrEditComponent {

    protected entityName: string = 'patient';

    public constructor(
        route: ActivatedRoute,
        router: Router,
        qcs: QuestionControlService,
        patientService: PatientService,
        service: PatientCreateOrEditQuestionsService
    ) {
        super(route, router, qcs, patientService, service);
    }

}
