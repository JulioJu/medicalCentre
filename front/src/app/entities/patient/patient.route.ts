import { Route } from '@angular/router';

import { PatientComponent } from './patient.component';
import { APPLICATION_NAME_PIPE } from '../../app.constants';

export const PATIENT_ROUTE: Route = {
    path: 'patients',
    component: PatientComponent,
    data: {
        authorities: [],
        pageTitle: APPLICATION_NAME_PIPE + 'Get all patients'
    }
};
