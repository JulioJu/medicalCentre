import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AbstractCreateOrEditComponent } from
    '../abstract/abstract-form.dynamic-form.component';

import { QuestionControlService }     from './../../shared';

import { PatientFormQuestionService } from
    './patient-form.questions.service';
import { PatientService } from './patient.service';

@Component({
    styles: [`
        .form-row{
            margin-top: 10px;
        }`],
    templateUrl: './../../shared/form/dynamic-form.component.html',
    providers:  [
        QuestionControlService,
        PatientFormQuestionService
    ]
})
export class PatientCreateOrEditComponent extends AbstractCreateOrEditComponent
        implements OnInit, AfterViewInit {

    constructor(
        router: Router,
        qcs: QuestionControlService,
        patientService: PatientService,
        service: PatientFormQuestionService
    ) {
        super(router, qcs, patientService, service);
    }

}
