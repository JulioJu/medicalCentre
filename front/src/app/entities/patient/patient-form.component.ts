import { Component } from '@angular/core';

import { QuestionBase }     from './../../shared';
import { PatientFormQuestionComponent } from
    './patient-form-questions.service';

@Component({
    selector: 'app-root',
    template: `
    <div>
        <h2>Job Application for Heroes</h2>
        <app-dynamic-form [questions]="patientForm"></app-dynamic-form>
    </div>
  `,
    providers:  [PatientFormQuestionComponent]
})
export class PatientCreateOrEditComponent {

    patientForm: QuestionBase<any>[];

    constructor(service: PatientFormQuestionComponent) {
        this.patientForm = service.getQuestions();
    }

}
