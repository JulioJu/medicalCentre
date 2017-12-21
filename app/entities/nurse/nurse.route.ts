import { Nurse, dbGetNurses, dbAddNurse  } from './';

export const nurseRoute = (app) => {
    app.route("/nurses")
        .get((res, req) => {
            dbGetNurses().then(str => {
                res.send(str)
            }).catch ((e) => res.send(e)) ;
        })
        .put((req, res, next) => {
            console.log(req.body);
            console.log(Object.keys(req.body).length);
            // TODO check if data are well formed
            if (req.body && Object.keys(req.body).length != 4) {
                res.status(400)
                    .send("Bad request: number of variables not correct");
            }
            else if (!req.body.id) {
                res.status(400).send("Bad request: parameter \"id\" missing");
            }
            else if (!req.body.firstname) {
                res.status(400)
                    .send("Bad request: parameter \"firstname\" missing");
            }
            else if (!req.body.lastname) {
                res.status(400)
                    .send("Bad request: parameter \"lastname\" missing");
            }
            else if (!req.body.adress) {
                res.status(400)
                    .send("Bad request: parameter \"adress\" missing");
            }
            else {
                const myNurse = new Nurse(req.body.id, req.body.firstname,
                    req.body.lastname, req.body.adress);
                dbAddNurse(myNurse).then(() => res.send("Nurse added"))
                    .catch(
                        (e) => {
                            console.log('on est bien dans l\'erreur');
                            res.send(e)
                        }
                    );
            }
        });

    app.route("/nurses/:id")
        .get((res, req) => {
            console.log(req.params);
            console.log(req.params.id);
        });
        // .delete((res, req) => {
        //
        // })

};
