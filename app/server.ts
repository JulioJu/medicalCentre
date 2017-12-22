import "module-alias/register"; // Used to take into account path declaration for modules
// See declarations in package.json

import * as express from 'express';             // The application server
import { patientRoute } from './entities/patient';
import { nurseRoute } from './entities/nurse';
import { nodeHttpServerInit, routeMain, dbMongoInit } from './shared';

const app: express.Application = express();

nodeHttpServerInit(app)
    .then(() => {
        dbMongoInit()
            .then(() => {
                console.log("Great! You have not forgotten to start your" +
                    " MonogoDB! Congratulation!");
                patientRoute(app);
                nurseRoute(app);
                // Keep routeMain at the and of this list: have a route /* for pages not
                // found.
                routeMain(app);
            })
            .catch(() => {
                console.log("Connot connect to the database. Maybe your MongoDB server"
                    + " is not running, or your database is not created. " +
                    "NodeJS is stopping with error code 3.");
                process.exit(3);
            });
    })
    .catch(() => {
        console.log('Error during the instatiation of the HTTP Server.' +
            ' Node is stopping with error code 2');
        process.exit(2);
    });
