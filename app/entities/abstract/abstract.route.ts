import * as express from 'express';
import { AbstractModel, AbstractService } from './';

export abstract class AbstractRoute {

    abstract routes();

    protected someRoutes<T extends AbstractModel>(abstractModel: new (...args)
        => T, entityName: string,  app: express.Application, routeName: string,
        abstractService: AbstractService, putMandatoriesParameters: Array<any>,
        putAllParametersOrdered: Array<any>) {

        app.route(routeName)
            .get((req, res) => {
                abstractService.getRecords().then(str => {
                    res.send(str)
                }).catch ((e) => res.send(e)) ;
            })
            .put((req, res, next) => {
                // TODO check if data are well formed
                const reqLength = Object.keys(req.body).length;
                if (!req.body ||
                    reqLength < putMandatoriesParameters.length ||
                    reqLength > putAllParametersOrdered.length){
                    res.status(400)
                        .send("Bad request: number of variables not correct");
                }
                let parametersAreOk = true;
                for (const i in putMandatoriesParameters) {
                    const parameter = req.body[putMandatoriesParameters[i]]
                    if (!parameter){
                        res.status(400)
                            .send("Bad request: parameter " +
                                putMandatoriesParameters[i] + " missing.");
                        parametersAreOk = false;
                        break;
                    }
                }
                let modelConstructor = [];
                for (const i in putAllParametersOrdered) {
                    let parameter = req.body[putAllParametersOrdered[i]];
                    if (parameter === undefined) {
                        parameter = null;
                    }
                    modelConstructor.push(parameter);
                }
                if (parametersAreOk) {
                    // TODO put args
                    const myModel: AbstractModel =
                        new abstractModel(...modelConstructor);
                    abstractService.insertOrUpdate(myModel)
                        .then((isInserted: boolean) => {
                            if (isInserted){
                                res.send(`${entityName} inserted`)
                            } else {
                                res.send(`${entityName} updated`)
                            }
                        })
                        .catch( (e) => res.send(e));
                }
            });
    }

}


