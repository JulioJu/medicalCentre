import * as express from 'express';
import { Nurse, NurseBaremongoService, NurseMongooseService } from './';
import { AbstractRoute } from '../abstract';

import { PutBareMongoMandatoryPerson }
    from '../person/person.route';

export const NurseBaremongoRoute = (): express.Router =>
    AbstractRoute<Nurse>(Nurse,
        'Nurse',
        express.Router(),
        '/nurses',
        NurseBaremongoService,
        PutBareMongoMandatoryPerson);
export const NurseMongooseRoute = (): express.Router =>
    AbstractRoute<Nurse>(Nurse,
        'Nurse',
        express.Router(),
        '/nurses',
        NurseMongooseService);
