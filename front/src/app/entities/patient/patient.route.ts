import { Routes } from '@angular/router';

import {
    PatientComponent,
    PatientDetailComponent,
    PatientCreateOrEditProtoComponent,
    PatientCreateOrEditComponent,
    PatientDeleteComponent
    } from './';
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
        path: 'patient-form-proto',
        component: PatientCreateOrEditProtoComponent,
        data: {
            pageTitle: 'Create patient (prototype)' + APPLICATION_NAME_PIPE
        }
    },
    {
        path: 'patient-form',
        component: PatientCreateOrEditComponent,
        data: {
            pageTitle: 'Create patient' + APPLICATION_NAME_PIPE
        }
    },
    {
        path: 'patient-form/:id',
        component: PatientCreateOrEditComponent,
        data: {
            pageTitle: 'Edit patient' + APPLICATION_NAME_PIPE
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
