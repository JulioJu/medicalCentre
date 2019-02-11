import * as express from 'express';
import { Nurse, NurseMongoNativeService, NurseMongooseService } from './';
import { AbstractRoute } from '../abstract';

import { PutMongoNativeMandatoryPerson }
    from '../person/person.route';

export const NurseMongoNativeRoute = (): express.Router =>
    AbstractRoute<Nurse>(Nurse,
        'Nurse',
        express.Router(),
        '/nurses',
        NurseMongoNativeService,
        PutMongoNativeMandatoryPerson);
export const NurseMongooseRoute = (): express.Router =>
    AbstractRoute<Nurse>(Nurse,
        'Nurse',
        express.Router(),
        '/nurses',
        NurseMongooseService);
