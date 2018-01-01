import "module-alias/register"; // Used to take into account path declaration for modules
// See declarations in package.json

import * as express from 'express';             // The application server
import { patientRoute } from './entities/patient';
import { nurseRoute } from './entities/nurse';
import { nodeHttpServerInit, routeMain, dbMongoInit } from './shared';

const app: express.Application = express();

console.log(`This process is pid ${process.pid}`);

// https://nodejs.org/api/process.html#process_event_exit
process.on('exit', (code) => {
    console.log(`This process have pid ${process.pid}`);
    console.log('This process have two parents: node and your' +
        ' shell. That\'s why when we type \`echo $?\' we might not have ' +
        'the exit code ' + code + '.');
});

// First promise
nodeHttpServerInit(app)
    .then(() => {
        // Second promise
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
                    "NodeJS is stopping with error code 15.");
                process.exit(15);
            });
    })
    .catch(() => {
        console.log('Error during the instatiation of the HTTP Server.' +
            ' Node is stopping with error code 16');
        process.exit(16);
    });
