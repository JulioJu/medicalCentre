import { Route } from '@angular/router';

import { NurseComponent } from './nurse.component';
import { APPLICATION_NAME_PIPE } from '../../app.constants';

export const PATIENT_ROUTE: Route = {
    path: 'nurses',
    component: NurseComponent,
    data: {
        authorities: [],
        pageTitle: APPLICATION_NAME_PIPE + 'Get all nurses'
    }
};
