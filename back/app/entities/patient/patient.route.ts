import * as express from 'express';
import { Patient, PatientBaremongoService, PatientMongooseService } from './';
import { AbstractRoute } from '../abstract';

import { PutBareMongoMandatoryPerson, PutAllParametersPerson }
    from '../person/person.route';

const commonArray = ['_idSSN', '_isMale', '_birthday'];

const putAllParameters = PutAllParametersPerson.concat
    (commonArray);

const putBareMongoMandatoriesParameters = PutBareMongoMandatoryPerson
    .concat(commonArray);

export const PatientBaremongoRoute = (): express.Router =>
    AbstractRoute<Patient>(Patient,
        'Patient',
        express.Router(),
        '/patients',
        PatientBaremongoService,
        putAllParameters,
        putBareMongoMandatoriesParameters);
export const PatientMongooseRoute = (): express.Router =>
    AbstractRoute<Patient>(Patient,
        'Patient',
        express.Router(),
        '/patients',
        PatientMongooseService,
        putAllParameters);
