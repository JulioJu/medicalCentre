import * as express from 'express';
import { Nurse, NurseBaremongoService, NurseMongooseService } from './';
import { AbstractRoute } from '../abstract';

const putMandatoriesParameters = ['_firstname', '_lastname',
    '_address'];
const putAllParametersOrdered = ['_id', '_firstname', '_lastname',
    '_address'];
export const NurseBaremongoRoute = (): express.Router =>
    AbstractRoute<Nurse>(Nurse, 'Nurse', express.Router(),
        '/nurses', NurseBaremongoService, putMandatoriesParameters,
        putAllParametersOrdered);
export const NurseMongooseRoute = (): express.Router =>
    AbstractRoute<Nurse>(Nurse, 'Nurse', express.Router(),
        '/nurses', NurseMongooseService, putMandatoriesParameters,
        putAllParametersOrdered);
