import "module-alias/register"; // Used to take into account path declaration for modules
// See declarations in package.json

import * as http from 'http';                   // HTTP server
import * as https from 'https';                 // HTTPS server
import * as express from 'express';             // The application server
import * as bodyParser from 'body-parser';      // Parse HTTP GET and POST variables
import * as path from 'path';                   // Deal with system paths
import * as fs from 'fs-extra';                 // Acces to files
import { patientRoute } from './entities/patient';
import { nurseRoute } from './entities/nurse';
import { routeMain, dbMongoInit } from './shared';

const app: express.Application = express();

// HTTP
const server = http.createServer(app);
const portHTTP = process.env.PORT || 8080;

// See solution at https://github.com/expressjs/express/issues/1569
// See documentations
// https://nodejs.org/api/http.html
// https://nodejs.org/api/net.html#net_server_listen
// https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
server.on('clientError', (e: any) => {
    console.log("coucou");
    if (e.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(portHTTP, () => {
                console.log(`HTTP server running on port ${portHTTP}.`);
            });
        }, 1000);
    }
});
server.listen(portHTTP, () => {
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

dbMongoInit()
    .then(() => {
        console.log("Great! You have not forgotten to start your MonogoDB!" +
            " Congratulation!");
        patientRoute(app);
        nurseRoute(app);
        // Keep routeMain at the and of this list: have a route /* for pages not
        // found.
        routeMain(app);
    })
    .catch(() => {
        console.log("Error. Maybe your MongoDB server is not running");
    });

