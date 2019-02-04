import { Router, Request, Response, NextFunction } from 'express';
import { AbstractModel, IAbstractService } from './';
import { IFormPutSuccess } from
    '../../utils/form-rest-api/iformputsuccess';

const put = <T extends AbstractModel>(req: Request,
        res: Response,
        AbstractModelType: new (...args: string[]) => T,
        abstractService: IAbstractService): void => {

    console.debug('POST params sent from front and tried to be persisted:' ,
        req.body);

    const myModel: AbstractModel =
        new AbstractModelType();

    Object.assign(myModel, req.body);

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
        AbstractModelType: new (...args: string[]) => T,
        abstractService: IAbstractService,
        putBareMongoMandatoriesParameters: string[]
): void => {
    // TODO check if data are well formed
    let errorMessage = '';
    for (const mandatoryKey of putBareMongoMandatoriesParameters) {
        if (!req.body[mandatoryKey] || req.body[mandatoryKey] === '') {
                // tslint:disable-next-line:restrict-plus-operands
                errorMessage += errorMessage + 'Bad request: parameter ' +
                    mandatoryKey + ' missing.\n';
        }
    }
    if (errorMessage === '') {
        put(req, res, AbstractModelType, abstractService);
    } else {
        let formSent: string | {};
        req.body ? formSent = req.body
            : formSent = 'POST Params empty';
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
        AbstractModelType: new (...args: any[]) => T,
        entityName: string,
        router: Router,
        routeName: string,
        abstractService: IAbstractService,
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
            putBareMongo(req, res, AbstractModelType, abstractService,
                putBareMongoMandatoriesParameters);
        } else {
            put(req, res, AbstractModelType, abstractService);
        }
    });

    return router;
};
