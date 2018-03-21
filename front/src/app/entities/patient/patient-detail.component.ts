import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

import { IPatient } from '../entities-interface/patient.interface';
import { PatientService } from './patient.service';

@Component({
    selector: 'app-patient-detail',
    templateUrl: './patient-detail.component.html'
})
export class PatientDetailComponent implements OnInit {
    patient: IPatient | null;
    private subscription: Subscription;

    constructor(private patientService: PatientService,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params.id);
        });
    }

    load(id: string): void {
        this.patientService
            .find(id)
            .subscribe((patientResponse: HttpResponse<IPatient>) => {
                this.patient = patientResponse.body;
            });
    }

    previousState(): void {
        window.history.back();
    }

}
