import * as express from 'express';
import { Nurse, NurseService } from './';
import { AbstractRoute } from '../abstract';

export class NurseRoute extends AbstractRoute {

    private nurseService: NurseService;

    constructor(private app: express.Application) {
        super();
        this.nurseService = new NurseService();
        this.app = app;
    }

    routes() {
        const putMandatoryParameters = ["_firstname", "_lastname",
            "_address"];
        const putAllParametersOrdered = ["_id", "_firstname", "_lastname",
            "_address"]
        super.someRoutes<Nurse>(Nurse, "Nurse", this.app, "/nurses",
            this.nurseService, putMandatoryParameters, putAllParametersOrdered);
    }

}
