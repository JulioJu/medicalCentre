import * as express from 'express';
import { Patient, PatientMongoNativeService, PatientMongooseService } from './';
import { AbstractRoute } from '../abstract';

import { PutMongoNativeMandatoryPerson } from '../person/person.route';

const putMongoNativeMandatoriesParameters = PutMongoNativeMandatoryPerson
    .concat(['_idSSN', '_gender', '_birthday', '_address',
    '_longitude', '_latitude']);

export const PatientMongoNativeRoute = (): express.Router =>
    AbstractRoute<Patient>(Patient,
        'Patient',
        express.Router(),
        '/patients',
        PatientMongoNativeService,
        putMongoNativeMandatoriesParameters);
export const PatientMongooseRoute = (): express.Router =>
    AbstractRoute<Patient>(Patient,
        'Patient',
        express.Router(),
        '/patients',
        PatientMongooseService);
