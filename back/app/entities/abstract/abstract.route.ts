import { Router, Request, Response, NextFunction } from 'express';
import { AbstractModel, IAbstractService } from './';
import { MongoError,
    FindAndModifyWriteOpResultObject,
    DeleteWriteOpResultObject }
    from 'mongodb';
import * as mongoose from 'mongoose';
import { IAbstract } from '../entities-interface';

// tslint:disable:no-unsafe-any

const Res502 = (res: Response, e: MongoError): void => {
    console.error(JSON.stringify(e));
    res.status(502);
    res.json(e);
};

const ResInsertOrUpdate = (res: Response,
        e: MongoError | mongoose.Error.ValidationError,
        isMongoose: boolean): void => {
    console.error(JSON.stringify(e));
    if (isMongoose && (e as mongoose.Error.ValidationError).errors) {
        res.status(400);
    } else if ((e as MongoError).code === 11000 ||
                (e as MongoError).code === 11001) {
        res.status(400);
    } else {
        res.status(502);
    }
    res.json(e);
};

const put = <T extends AbstractModel>(req: Request,
        res: Response,
        AbstractModelType: new (...args: string[]) => T,
        abstractService: IAbstractService,
        isMongoose: boolean): void => {

    console.debug('POST params sent from front and tried to be persisted:' ,
        req.body);

    const myModel: AbstractModel =
        new AbstractModelType();

    Object.assign(myModel, req.body);

    abstractService.insertOrUpdate(myModel)
        .then((response: FindAndModifyWriteOpResultObject<IAbstract>) => {
            res.send(response);
        })
        .catch((e: MongoError) => ResInsertOrUpdate(res, e, isMongoose));
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
        put(req, res, AbstractModelType, abstractService, false);
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
    // tslint:disable-next-line:no-any
        AbstractModelType: new (...args: any[]) => T,
        entityName: string,
        router: Router,
        routeName: string,
        abstractService: IAbstractService,
        putBareMongoMandatoriesParameters?: string[]): Router => {

    router.get(routeName, (req: Request, res: Response) => {
        abstractService.getRecords()
            .then((str: string) => res.json(str))
            .catch((e: MongoError) => Res502(res, e));
    });

    router.get(routeName + '/:_id', (req: Request, res: Response) => {
        abstractService.getRecord(req.params._id)
            .then((str: string) => res.json(str))
            .catch((e: MongoError) => Res502(res, e));
    });

    router.delete(routeName + '/:_id', (req: Request, res: Response) => {
        abstractService.deleteRecord(req.params._id)
            .then((str: DeleteWriteOpResultObject['result']) => res.json(str))
            .catch((e: MongoError) => Res502(res, e));
    });

    router.put(routeName, (req: Request, res: Response, next: NextFunction) => {
        if (putBareMongoMandatoriesParameters) {
            putBareMongo(req, res, AbstractModelType, abstractService,
                putBareMongoMandatoriesParameters);
        } else {
            put(req, res, AbstractModelType, abstractService, true);
        }
    });

    return router;
};
