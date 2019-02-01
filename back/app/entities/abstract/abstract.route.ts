import { Router, Request, Response, NextFunction } from 'express';
import { AbstractModel, IAbstractService } from './';
import { IFormPutSuccess } from
    '../../utils/form-rest-api/iformputsuccess';

export const AbstractRoute = <T extends AbstractModel>(abstractModel: new
    (...args: any[]) => T, entityName: string,  router: Router,
    routeName: string, abstractService: IAbstractService,
    putMandatoriesParameters: T[any],
    putAllParametersOrdered: T[any]) => {

    router.get(routeName, (req: Request, res: Response) => {
        abstractService.getRecords()
            .then((str) => res.json(str))
            .catch((e) => res.json(e));
    });

    router.get(routeName + '/:_id', (req: Request, res: Response) => {
        abstractService.getRecord(req.params._id)
            .then((str) => res.json(str))
            .catch((e) => res.json(e));
    });

    router.delete(routeName + '/:_id', (req: Request, res: Response) => {
        abstractService.deleteRecord(req.params._id)
            .then((str) => res.json(str))
            .catch((e) => res.json(e));
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
            // tslint:disable-next-line:restrict-plus-operands
            errorMessage = 'Bad request: number of variables not correct.' +
                ' You have ' + reqLength +
                ' parameters, and you should have at least ' + minParam +
                ' and at the most ' + maxParam + '.\n';
        }
        Object.keys(putMandatoriesParameters)
            .forEach((i: any) => {
                const parameter = req.body[putMandatoriesParameters[i]];
                if (!parameter) {
                    // tslint:disable-next-line:restrict-plus-operands
                    errorMessage = errorMessage + 'Bad request: parameter ' +
                        putMandatoriesParameters[i] + ' missing.\n';
                    parametersAreOk = false;
                }
            });
        if (!parametersAreOk) {
            let formSent: any;
            req.body ? formSent = req.body
                : formSent = 'nothing sent';
            res.status(400)
                .json(
                    // its type is IHttpErrorResponseFormPutError
        // ../../../../form-http-interface/ihttperrorresponseformputerror.ts
                    {
                        error_message: errorMessage,
                        error_message_origin: 'back',
                        details: {formSent}
                    }
                );
        } else {
            const modelConstructor: any[] = [];
            Object.keys(putAllParametersOrdered)
                .forEach((i: any) => {
                    let parameter = req.body[putAllParametersOrdered[i]];
                    if (parameter === undefined) {
                        parameter = undefined;
                    }
                    modelConstructor.push(parameter);
                });
            // TODO put args
            const myModel: AbstractModel =
                new abstractModel(...modelConstructor);

            abstractService.insertOrUpdate(myModel)
                .then((response: IFormPutSuccess) => {
                    res.send(response);
                })
                .catch((e) => {
                    res.status(400)
                    .json(
                        // its type is IHttpErrorResponseFormPutError
                        // defined in
        // ../../../../form-http-interface/ihttperrorresponseformputerror.ts
                        {
                            error_message: e.errmsg,
                            error_message_origin: 'mongo',
                            details: e
                        }
                    );
                });
        }
    });

    return router;
};
