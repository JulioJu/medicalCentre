import { Routes } from '@angular/router';

import {
    NurseComponent,
    NurseDetailComponent,
    NurseCreateOrEditComponent,
    NurseDeleteComponent
    } from './';
import { APPLICATION_NAME_PIPE } from '../../app.constants';

export const NURSE_ROUTE: Routes = [
    {
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
    },
    {
        path: 'nurse-form',
        component: NurseCreateOrEditComponent,
        data: {
            pageTitle: 'Create or edit nurse' + APPLICATION_NAME_PIPE
        }
    },
    {
        path: 'nurse-form/:id',
        component: NurseCreateOrEditComponent,
        data: {
            pageTitle: 'Edit patient' + APPLICATION_NAME_PIPE
        }
    },
    {
        path: 'nurse-delete/:id',
        component: NurseDeleteComponent,
        data: {
            pageTitle: 'Delete nurse' + APPLICATION_NAME_PIPE
        }
    }
];
