import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { PatientService } from './patient.service';
import { IPatient } from '../entities-interface/patient.interface';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['../abstract/abstract.component.css']
})
export class PatientComponent implements OnInit {

    patients: IPatient[] | null;

    constructor(private patientService: PatientService) { }

    ngOnInit(): void {
        this.patientService.query()
            .subscribe(
                (res: HttpResponse<IPatient[]>) => {
                    this.patients = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onError(errorMessage: string): void {
        // TODO
        throw new Error(errorMessage);
    }

}
