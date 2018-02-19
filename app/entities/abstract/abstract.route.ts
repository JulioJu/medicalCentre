import { Router, Request, Response, NextFunction } from 'express'
import { AbstractModel, AbstractBaremongoService } from './';

export const AbstractRoute = <T extends AbstractModel>(abstractModel: new
    (...args: any[]) => T, entityName: string,  router: Router,
    routeName: string, abstractService: AbstractBaremongoService,
    putMandatoriesParameters: Array<any>,
    putAllParametersOrdered: Array<any>) => {

    router.get(routeName, (req: Request, res: Response) => {
        abstractService.getRecords()
            .then((str) => res.send(str))
            .catch((e) => res.send(e));
    });

    router.get(routeName + '/:_id', (req: Request, res: Response) => {
        abstractService.getRecord(req.params['_id'])
            .then((str) => res.send(str))
            .catch((e) => res.send(e));
    });

    router.delete(routeName + '/:_id', (req: Request, res: Response) => {
        abstractService.deleteRecord(req.params['_id'])
            .then((str) => res.send(str))
            .catch((e) => res.send(e));
    });

    router.put(routeName, (req: Request, res: Response, next: NextFunction) => {
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
        Object.keys(putAllParametersOrdered).forEach((i: any) => {
            const parameter = req.body[putMandatoriesParameters[i]]
            if (!parameter) {
                errorMessage = errorMessage + 'Bad request: parameter ' +
                        putMandatoriesParameters[i] + ' missing.\n'
                parametersAreOk = false;
            }
        });
        if (!parametersAreOk) {
                res.status(400).send(errorMessage);
        } else {
            const modelConstructor: Array<any> = [];
            Object.keys(putAllParametersOrdered).forEach((i: any) => {
                let parameter = req.body[putAllParametersOrdered[i]];
                if (parameter === undefined) {
                    parameter = null;
                }
                modelConstructor.push(parameter);
            });
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
                .catch((e) => res.send(e));
        }
    });

    return router;
    }
