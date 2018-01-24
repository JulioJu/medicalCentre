import * as express from 'express';
import { Patient, PatientService } from './';
import { AbstractRoute } from '../abstract';

export const PatientRoute = (): express.Router => {
    const putMandatoriesParameters = ['_idSSN', '_firstname', '_lastname',
        '_isMale', '_birthday', '_address'];
    const putAllParametersOrdered = ['_id', '_idSSN', '_firstname',
        '_lastname', '_isMale', '_birthday', '_address']
    return AbstractRoute<Patient>(Patient, 'Patient', express.Router(),
    '/patients', new PatientService(), putMandatoriesParameters,
    putAllParametersOrdered);
}
