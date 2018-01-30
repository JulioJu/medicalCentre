import * as express from 'express';             // The application server
import { PatientRoute } from './entities/patient';
import { NurseRoute } from './entities/nurse';
import { nodeHttpServerInit, routeMain, dbMongoInit,
    dbMongooseInit } from './utils';
// CommonJS module declaration because otherwise tsc raise false positive.
require('console-info');
require('console-warn');
require('console-error');
require('../console-debug');

const app: express.Application = express();

console.debug(`This process is pid ${process.pid}`);

// https://nodejs.org/api/process.html#process_event_exit
process.on('exit', (code) => {
    console.debug(`This process have pid ${process.pid}`);
    console.info('If you run with npm or yarn, this process have one parent:'
        + '"node /usr/bin/yarn" (or npm)' +
        '. That\'s why when we type \`echo $?\' we might not have ' +
        'the exit code ' + code + ', but we have the exit code of yarn/npm.'
        + ' You could run directly `node ./appJS/server.js\'');
});

// Tests args
const baremongoArg = 'db=baremongo';
const mongooseArg = 'db=mongoose';
const errorMessageArg = () => {
    console.error('You must have one argument, either "' + baremongoArg
        + '", or "' + mongooseArg + '"".'
        + ' With Yarn you could write `yarn start ' + baremongoArg + '\' or'
        + ' `yarn start ' + mongooseArg + '\'.'
    );
}
let firstArg;
if (process.argv.length !== 3) {
    errorMessageArg();
    process.exit(17)
} else {
    firstArg = process.argv[2]
    if (firstArg !== baremongoArg && firstArg !== mongooseArg) {
        errorMessageArg();
    }
}

// Execution
// We can't use both bare MongoDB  Node.js Driver and Mongoose.
// Maybe because we use the same DB?
if (firstArg === baremongoArg) {
    console.info('===================================');
    console.info('| You use bare MongoDB Node.js Driver');
    console.info('| You could also try this app with argument ' + mongooseArg
        + ': you would use Mongoose');
    console.info('===================================');
    // First promise
    nodeHttpServerInit(app)
        .then(() => {
            // Second promise
            dbMongoInit()
                .then(() => {
                    console.info('Great! You have not forgotten to start your' +
                        ' MonogoDB! Congratulation!');
                    app.use(PatientRoute())
                    app.use(NurseRoute())
                    routeMain(app);
                })
                .catch(() => {
                    console.error('Connot connect to the database. Maybe your'
                        + ' MongoDB server is not running, or there is a'
                        + ' problem with your'
                        + ' database. NodeJS is stopping with error code 15.');
                    process.exit(15);
                });
        })
        .catch(() => {
            console.error('Error during the instatiation of the HTTP Server.' +
                ' Node is stopping with error code 16');
            process.exit(16);
        });
} else if (firstArg === mongooseArg) {
    console.info('===================================');
    console.info('| You use Mongoose');
    console.info('| You could also try this app with argument ' + baremongoArg
        + ': you would use Mongoose');
    console.info('===================================');
    dbMongooseInit();
}
