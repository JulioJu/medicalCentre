import * as express from 'express';
import { Patient, PatientBaremongoService, PatientMongooseService } from './';
import { AbstractRoute } from '../abstract';

const putMandatoriesParameters = ['_idSSN', '_firstname', '_lastname',
    '_isMale', '_birthday', '_address'];
const putAllParametersOrdered = ['_id', '_idSSN', '_firstname',
    '_lastname', '_isMale', '_birthday', '_address'];
export const PatientBaremongoRoute = (): express.Router =>
    AbstractRoute<Patient>(Patient,
        'Patient',
        express.Router(),
        '/patients',
        PatientBaremongoService,
        putMandatoriesParameters,
        putAllParametersOrdered);
export const PatientMongooseRoute = (): express.Router =>
    AbstractRoute<Patient>(Patient,
        'Patient',
        express.Router(),
        '/patients',
        PatientMongooseService,
        putMandatoriesParameters,
        putAllParametersOrdered);
