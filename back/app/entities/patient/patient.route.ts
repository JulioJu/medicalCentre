import * as express from 'express';
import { Patient, PatientBaremongoService, PatientMongooseService } from './';
import { AbstractRoute } from '../abstract';

import { PutBareMongoMandatoryPerson } from '../person/person.route';

const putBareMongoMandatoriesParameters = PutBareMongoMandatoryPerson
    .concat(['_idSSN', '_isMale', '_birthday', '_address',
    '_longitude', '_latitude']);

export const PatientBaremongoRoute = (): express.Router =>
    AbstractRoute<Patient>(Patient,
        'Patient',
        express.Router(),
        '/patients',
        PatientBaremongoService,
        putBareMongoMandatoriesParameters);
export const PatientMongooseRoute = (): express.Router =>
    AbstractRoute<Patient>(Patient,
        'Patient',
        express.Router(),
        '/patients',
        PatientMongooseService);
