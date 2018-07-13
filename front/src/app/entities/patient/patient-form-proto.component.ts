import { Component } from '@angular/core';

import { QuestionBase }     from './../../shared';
import { PatientFormQuestionProtoComponent } from
    './patient-form-questions-proto.service';

@Component({
    selector: 'app-root',
    template: `
    <div>
        <h2>Create or Edit a patient (prototype, do nothing)</h2>
        <app-dynamic-form [questions]="patientForm"></app-dynamic-form>
    </div>
  `,
    providers:  [PatientFormQuestionProtoComponent]
})
export class PatientCreateOrEditProtoComponent {

    patientForm: QuestionBase<any>[];

    constructor(service: PatientFormQuestionProtoComponent) {
        this.patientForm = service.getQuestions();
    }

}
