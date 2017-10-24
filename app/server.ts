import "module-alias/register"; // Used to take into account path declaration for modules
// See declarations in package.json

import * as http from 'http';                   // HTTP server
import * as https from 'https';                 // HTTPS server
import * as express from 'express';             // The application server
import * as bodyParser from 'body-parser';      // Parse HTTP GET and POST variables
import * as path from 'path';                   // Deal with system paths
import * as fs from 'fs-extra';                 // Acces to files
// import Nurse from './dataModel/nurses'
import { Patient } from './entities/patient'

const app: express.Application = express();

// HTTP
const serverHTTP = http.createServer(app);
const portHTTP = process.env.PORT || 8080;
serverHTTP.listen(portHTTP, () => {
    console.log(`HTTP server running on port ${portHTTP}.`);
});

// HTTPS
const portHTTPS = 8443;
const TLS_SSL =	{
    key : fs.readFileSync( path.join("./app/MM.pem"		 )),
    cert: fs.readFileSync( path.join("./app/certificat.pem") )
};
const serverHTTPS = https.createServer(TLS_SSL, app);
serverHTTPS.listen(portHTTPS, () => {
    console.log(`HTTPS server running on port ${portHTTPS}. `);
});

// Configure the web server
app.use(bodyParser.json()); // get information from html forms (post)
app.use(bodyParser.urlencoded({extended: true})); // get

app.get("/", (req, res) => {
   res.json( {message: "Il va falloir implémenter tout ça..."} );
});

app.get("/test", (req, res) => {
   res.json( {message: "ok tout va bien"} );
});

app.get("/testParam", (req, res) => {
    res.header("Content-Type", "text/html; charset=utf-8");
    for (let att in req.query) {
        res.write(`${att}:${req.query[att]}\n`)
    }
    res.write("éééé");
    res.end();
});


app.get("/testParam2", (req, res) => {
    console.log(req.query);
    if (req.query && Object.keys(req.body).length == 2
        && req.query.prenom && req.query.nom) {
        res.json( {message: req.query} );
    }
    else {
        res.status(400).send('éééBad Request');
    }
});

app.post("/addPatient", (req, res, next) => {
    console.log(req.body);
    console.log(Object.keys(req.body).length);
    // TODO check if data are well formed
    if (req.body && Object.keys(req.body).length != 6) {
        res.status(400).send("Bad request: number of variables not correct");
    }
    else if (!req.body.idSSN) {
        res.status(400).send("Bad request: parameter \"idSSN\" missing");
    }
    else if (!req.body.firstname) {
        res.status(400).send("Bad request: parameter \"firstname\" missing");
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
        res.send("Ça marche");
        new Patient(req.body.idSSN, req.body.firstname, req.body.lastname,
            req.body.isMale, req.body.birthday, req.body.adress);
    }
});

const dataPath = path.join(__dirname, "/../app/data");
console.log("dataPath" + dataPath);
app.use('/data', express.static(dataPath));
