import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { PatientService } from './patient.service';
import { PatientInterface } from '../entities-interface/patient.interface';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

    patients: PatientInterface[] | null;

    constructor(private patientService: PatientService) { }

    ngOnInit(): void {
        this.patientService.query()
            .subscribe(
                (res: HttpResponse<PatientInterface[]>) => {
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
