import * as express from 'express';
import { Patient, PatientService } from './';
import { AbstractRoute } from '../abstract';

export class PatientRoute extends AbstractRoute {

    private patientService: PatientService;

    constructor(private app: express.Application) {
        super();
        this.patientService = new PatientService();
    }

    routes() {
        const putMandatoriesParameters = ["_idSSN", "_firstname", "_lastname",
            "_isMale", "_birthday", "_address"];
        const putAllParametersOrdered = ["_id", "_idSSN", "_firstname",
            "_lastname", "_isMale", "_birthday", "_address"]
        super.someRoutes<Patient>(Patient, "Patient", this.app, "/patients",
            this.patientService, putMandatoriesParameters,
            putAllParametersOrdered);
    }

}

