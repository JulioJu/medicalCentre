import { Component } from '@angular/core';
// import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
//
// import { IPatient } from '../entities-interface/patient.interface';
// import { Patient } from './patient.service';

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

    patientForm: any[];

    constructor(service: PatientFormQuestionComponent) {
        this.patientForm = service.getQuestions();
    }

}
