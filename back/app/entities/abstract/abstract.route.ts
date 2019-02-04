import { Router, Request, Response, NextFunction } from 'express';
import { AbstractModel, IAbstractService } from './';
import { IFormPutSuccess } from
    '../../utils/form-rest-api/iformputsuccess';

const putBareMongoCheckParameters = (req: Request,
        putBareMongoMandatoriesParameters: string[],
        putAllParameters: string[]): string => {
    let errorMessage = '';
    const reqLength = Object.keys(req.body).length;
    const minParam = putBareMongoMandatoriesParameters.length;
    const maxParam = (putAllParameters as string[]).length;
    if (!req.body || reqLength < minParam || reqLength > maxParam) {
        // tslint:disable-next-line:restrict-plus-operands
        errorMessage += 'Bad request: number of variables not correct.' +
            ' You have ' + reqLength +
            ' parameters, and you should have at least ' + minParam +
            ' and at the most ' + maxParam + '.\n';
    }
    Object.keys(putBareMongoMandatoriesParameters)
        .forEach((i: any) => {
            const parameter = req.body[putBareMongoMandatoriesParameters[i]];
            if (!parameter) {
                // tslint:disable-next-line:restrict-plus-operands
                errorMessage += errorMessage + 'Bad request: parameter ' +
                    putBareMongoMandatoriesParameters[i] + ' missing.\n';
            }
        });

    return errorMessage;
};

const put = <T extends AbstractModel>(req: Request,
        res: Response,
        abstractModel: new (...args: string[]) => T,
        abstractService: IAbstractService,
        putAllParameters: string[]): void => {

    const modelConstructor: any[] = [];
    Object.keys(putAllParameters)
        .forEach((i: any) => {
            let parameter = req.body[putAllParameters[i]];
            if (parameter === undefined) {
                parameter = undefined;
            }
            modelConstructor.push(parameter);
        });

    const myModel: AbstractModel =
        new abstractModel(...modelConstructor);

    abstractService.insertOrUpdate(myModel)
        .then((response: IFormPutSuccess) => {
            res.send(response);
        })
        .catch((e: Error) => {
            // console.error(e);
            res.status(502)
            .json(
                // its type is IHttpErrorResponseFormPutError
                // defined in
// ../../../../form-http-interface/ihttperrorresponseformputerror.ts
                {
                    error_message: e.message,
                    error_message_origin: 'mongo',
                    details: e.stack
                }
            );
        });
};

const putBareMongo = <T extends AbstractModel>(req: Request,
        res: Response,
        abstractModel: new (...args: string[]) => T,
        abstractService: IAbstractService,
        putAllParameters: string[],
        putBareMongoMandatoriesParameters: string[]
): void => {
    // TODO check if data are well formed
    let errorMessage = '';
    errorMessage = putBareMongoCheckParameters(req,
                        putAllParameters,
                        putBareMongoMandatoriesParameters);
    if (errorMessage === '') {
        put(req, res, abstractModel, abstractService, putAllParameters);
    } else {
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
    }
};

/**
 *  @param putBareMongoMandatoriesParameters
 *      used for the Mongo client bare, without Mangoose.
 *
 */
export const AbstractRoute = <T extends AbstractModel>(
        abstractModel: new (...args: any[]) => T,
        entityName: string,
        router: Router,
        routeName: string,
        abstractService: IAbstractService,
        putAllParameters: string[],
        putBareMongoMandatoriesParameters?: string[]) => {

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
        if (putBareMongoMandatoriesParameters) {
            putBareMongo(req, res, abstractModel, abstractService,
                putBareMongoMandatoriesParameters, putAllParameters);
        } else {
            put(req, res, abstractModel, abstractService, putAllParameters);
        }
    });

    return router;
};
