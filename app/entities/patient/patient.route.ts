import { Patient, dbGetPatients, dbAddPatient  } from './';

export const patientRoute = (app) => {
    app.route("/patients")
        .get((res, req) => {
            dbGetPatients().then(str => {
                res.send(str)
            }).catch ((e) => res.send(e)) ;
        })
        .put((req, res, next) => {
            console.log(req.body);
            console.log(Object.keys(req.body).length);
            // TODO check if data are well formed
            if (req.body && Object.keys(req.body).length != 6) {
                res.status(400)
                    .send("Bad request: number of variables not correct");
            }
            else if (!req.body.idSSN) {
                res.status(400)
                    .send("Bad request: parameter \"idSSN\" missing");
            }
            else if (!req.body.firstname) {
                res.status(400)
                    .send("Bad request: parameter \"firstname\" missing");
            }
            else if (!req.body.lastname) {
                res.status(400)
                    .send("Bad request: parameter \"lastname\" missing");
            }
            else if (!req.body.isMale) {
                res.status(400)
                    .send("Bad request: parameter \"isMale\" missing");
            }
            else if (!req.body.birthday) {
                res.status(400)
                    .send("Bad request: parameter \"birthday\" missing");
            }
            else if (!req.body.adress) {
                res.status(400)
                    .send("Bad request: parameter \"adress\" missing");
            }
            else {
                const myPatient = new Patient(req.body.idSSN, req.body.firstname,
                    req.body.lastname, req.body.isMale, req.body.birthday,
                    req.body.adress);
                dbAddPatient(myPatient).then(() => res.send("Patient added"))
                    .catch(
                        (e) => {
                            res.send(e)
                        }
                    );
            }
        });

};
