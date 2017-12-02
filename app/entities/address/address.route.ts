import { Router } from 'express';
import { Address } from '../address'

export function addressRoute(): Router {

    const router = Router();

    let addresss = new Map<number, Address>();


    // setting the values
    addresss.set(1,
        new Address(1, 'France', '05000',
            'rue Mazel', 33, 1, 44.558655, 6.077606));
    addresss.set(2,
        new Address(2, 'France', '05000',
            'rue Mazel', 33, 1, 44.558655, 6.077606));

    router.get('/getAddresss', (res) => {
        res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"})
        res.write('coucou', 'utf-8');
        res.end();
    });

    router.put('/addOrUpdateAddress', (req, res) => {
        // TODO check if data are well formed
        if (req.body && Object.keys(req.body).length != 4) {
            res.status(400).send("Bad request: number of variables not correct");
        }
        else if (!req.body.id) {
            res.status(400).send("Bad request: parameter \"id\" missing");
        }
        else if (!req.body.firstname) {
            res.status(400).send("Bad request: parameter \"firstname\" missing");
        }
        else if (!req.body.lastname) {
            res.status(400).send("Bad request: parameter \"lastname\" missing");
        }
        else if (!req.body.adress) {
            res.status(400).send("Bad request: parameter \"adress\" missing");
        }
        else {
            res.send("Ça marche");
            new Address(req.body.id, req.body.firstname, req.body.lastname,
                req.body.adress);
        }
    });

    return router;
};
