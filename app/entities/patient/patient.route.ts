import { outerPromise, nonnnnnPromise, Patient, /* dbGetPatients, */ dbAddPatient  } from './';

export const patientRoute = (app) => {
    app.post("/addPatient", (req, res, next) => {
        console.log(req.body);
        console.log(Object.keys(req.body).length);
        // TODO check if data are well formed
        if (req.body && Object.keys(req.body).length != 6) {
            res.status(400)
                .send("Bad request: number of variables not correct");
        }
        else if (!req.body.idSSN) {
            res.status(400).send("Bad request: parameter \"idSSN\" missing");
        }
        else if (!req.body.firstname) {
            res.status(400)
                .send("Bad request: parameter \"firstname\" missing");
        }
        else if (!req.body.lastname) {
            res.status(400).send("Bad request: parameter \"lastname\" missing");
        }
        else if (!req.body.isMale) {
            res.status(400).send("Bad request: parameter \"isMale\" missing");
        }
        else if (!req.body.birthday) {
            res.status(400).send("Bad request: parameter \"birthday\" missing");
        }
        else if (!req.body.adress) {
            res.status(400).send("Bad request: parameter \"adress\" missing");
        }
        else {
            let myPatient = new Patient(req.body.idSSN, req.body.firstname,
                req.body.lastname, req.body.isMale, req.body.birthday,
                req.body.adress);
            dbAddPatient(myPatient).then(() => res.send("Patient added"))
            .catch(
                (e) => {
                    console.log('on est bien dans l\'erreur');
                    res.send(e)
                }
            );
        }
    });

    app.get("/getPatients", (req, res) => {
        console.log('n°1 coucou'); // 1
        outerPromise()
            .then((myVariable: string) => {
                console.log("n°6 Notre promesse finale est tenue. On est heureux");
                console.log("n°7 on raffiche la variable récupérée dans l'inner" +
                    " promise fakeMongoInnerPromise" + myVariable);
            })
            .catch((e: string) => {
                console.log('on est dans le catch de la fin du monde');
                res.send(e);
            });

        nonnnnnPromise(); // 3 (affiche « coucou non promise »)
        console.log("n° 2 kon écrit après la non promesse"); // 2
        // dbGetPatients().then(str => {
        //     res.send(str)
        // }).catch ((e) => res.send(e)) ;
    });

};
