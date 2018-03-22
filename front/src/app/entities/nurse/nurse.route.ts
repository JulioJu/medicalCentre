import { Routes } from '@angular/router';

import { NurseComponent } from './nurse.component';
import { NurseDetailComponent } from './nurse-detail.component';
import { APPLICATION_NAME_PIPE } from '../../app.constants';

export const NURSE_ROUTE: Routes = [{
    path: 'nurses',
    component: NurseComponent,
    data: {
        authorities: [],
        pageTitle: 'Get all nurses' + APPLICATION_NAME_PIPE
    }
},
    {
        path: 'nurse/:id',
        component: NurseDetailComponent,
        data: {
            pageTitle: 'Get nurse' + APPLICATION_NAME_PIPE
        }
}];
