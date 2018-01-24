import * as express from 'express';
import { AbstractModel, AbstractService } from './';

export const AbstractRoute = <T extends AbstractModel>(abstractModel: new
    (...args) => T, entityName: string,  router: express.Router, routeName:
    string, abstractService: AbstractService, putMandatoriesParameters:
    Array<any>, putAllParametersOrdered: Array<any>)  => {

    router.get(routeName, (req, res) => {
            abstractService.getRecords()
                .then((str) => {
                    res.send(str)
                })
                .catch((e) => res.send(e));
    });

    router.put(routeName, (req, res, next) => {
        // TODO check if data are well formed
        let parametersAreOk = true;
        let errorMessage = '';
        const reqLength = Object.keys(req.body).length;
        const minParam = putMandatoriesParameters.length;
        const maxParam = putAllParametersOrdered.length;
        if (!req.body || reqLength < minParam || reqLength > maxParam) {
            parametersAreOk = false;
            errorMessage = 'Bad request: number of variables not correct.' +
                ' You have ' + reqLength +
                ' parameters, and you should have at least ' + minParam +
                ' and at the most ' + maxParam + '.\n';
        }
        for (const i of Object.keys(putMandatoriesParameters)) {
            const parameter = req.body[putMandatoriesParameters[i]]
            if (!parameter) {
                errorMessage = errorMessage + 'Bad request: parameter ' +
                        putMandatoriesParameters[i] + ' missing.\n'
                parametersAreOk = false;
            }
        }
        if (!parametersAreOk) {
                res.status(400).send(errorMessage);
        } else {
            const modelConstructor = [];
            for (const i of Object.keys(putAllParametersOrdered)) {
                let parameter = req.body[putAllParametersOrdered[i]];
                if (parameter === undefined) {
                    parameter = null;
                }
                modelConstructor.push(parameter);
            }
            // TODO put args
            const myModel: AbstractModel =
                new abstractModel(...modelConstructor);
            abstractService.insertOrUpdate(myModel)
                .then((isUPdated: boolean) => {
                    if (isUPdated) {
                        res.send(`${entityName} updated`)
                    } else {
                        res.send(`${entityName} inserted`)
                    }
                })
                .catch( (e) => res.send(e));
        }
    });

    return router;
    }
