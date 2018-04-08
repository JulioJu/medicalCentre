import { Routes } from '@angular/router';

import { PatientComponent } from './patient.component';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientCreateOrEditComponent } from './patient-form.component';
import { PatientDeleteComponent } from './patient-delete.component';
import { APPLICATION_NAME_PIPE } from '../../app.constants';

export const PATIENT_ROUTE: Routes = [
    {
        path: 'patients',
        component: PatientComponent,
        data: {
            authorities: [],
            pageTitle: 'Get all patients' + APPLICATION_NAME_PIPE
        }
    },
    {
        path: 'patient/:id',
        component: PatientDetailComponent,
        data: {
            pageTitle: 'Get patient' + APPLICATION_NAME_PIPE
        }
    },
    {
        path: 'patient-create',
        component: PatientCreateOrEditComponent,
        data: {
            pageTitle: 'Create patient' + APPLICATION_NAME_PIPE
        }
    },
    {
        path: 'patient-delete/:id',
        component: PatientDeleteComponent,
        data: {
            pageTitle: 'Delete patient' + APPLICATION_NAME_PIPE
        }
    }
];
