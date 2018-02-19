import * as express from 'express';
import { Nurse, NurseBaremongoService } from './';
import { AbstractRoute } from '../abstract';

export const NurseRoute = (): express.Router => {
    const putMandatoriesParameters = ['_firstname', '_lastname',
        '_address'];
    const putAllParametersOrdered = ['_id', '_firstname', '_lastname',
        '_address']
    return AbstractRoute<Nurse>(Nurse, 'Nurse', express.Router(),
        '/nurses', new NurseBaremongoService(), putMandatoriesParameters,
        putAllParametersOrdered);
}
