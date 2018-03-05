import * as express from 'express';             // The application server
import { PatientBaremongoRoute,
    PatientMongooseRoute } from './entities/patient';
import { NurseBaremongoRoute, NurseMongooseRoute } from './entities/nurse';
import { nodeHttpServerInit, routeMain, dbMongoInit,
    dbMongooseInit } from './utils';
// You could instead use https://nodejs.org/en/docs/inspector/
// CommonJS module declaration because otherwise tsc raise false positive.
require('console-info');
require('console-warn');
require('console-error');
require('../console-debug');

const app: express.Application = express();

console.debug(`This process is pid ${process.pid}`);

const nodeversion = process.versions.node
console.info(`You use version ${nodeversion} of Node.js`);

// https://github.com/parshap/check-node-version/issues/6
// Function parseFloat parse correctly if nodeversion === '9.5.8'.
// tslint:disable-next-line
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat
if (parseFloat(nodeversion) < 9.5) {
    console.error('Please use a node >= 9.5.0');
    process.exit(20);
}

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
const baremongoArg = 'baremongo';
const mongooseArg = 'mongoose';
const errorMessageArg = () => {
    console.error('You must use at least one database, either "' + baremongoArg
        + '", or "' + mongooseArg + '"". You could use both.'
        + ' With Yarn you could write `yarn start ' + baremongoArg + '\' or'
        + ' `yarn start ' + mongooseArg + '\' or'
        + ' `yarn start ' + baremongoArg + ' ' + mongooseArg + '\'.'
    );
}
let useMongoose = false;
let useBaremongo = false;
if (process.argv.length !== 3 &&  process.argv.length !== 4) {
    errorMessageArg();
    process.exit(17)
} else {
    if (baremongoArg === process.argv[2] || baremongoArg === process.argv[3]) {
        useBaremongo = true;
    }
    if (mongooseArg === process.argv[2] || mongooseArg === process.argv[3]) {
        useMongoose = true;
    }
    if (!useMongoose && !useBaremongo) {
        errorMessageArg();
    }
}

const mongoConnectionSuccess = (name: string, url: string) => {
    console.info('\n  ===================================\n',
    '| You use ' + name + '. \n',
    '| You could access to their functionnalities thanks URLs "/'
    + url + '/*"\n',
    '===================================\n');
}

const mongoConnectionError = () => {
    console.error('Connot connect to the database. Maybe your'
        + ' MongoDB server is not running, or there is a'
        + ' problem with your'
        + ' database. NodeJS is stopping with error code 15.');
    process.exit(15);
}

const mongoStatements = () => {
    if (useBaremongo) {
        dbMongoInit()
            .then(() => {
                mongoConnectionSuccess('bare MongoDB Node.JS Driver',
                    'baremongo')
                app.use('/baremongo', PatientBaremongoRoute())
                app.use('/baremongo', NurseBaremongoRoute())
                if (!useMongoose) {
                    // should be at the end
                    routeMain(app);
                }
            })
        .catch (() => {mongoConnectionError()})
    }
}

const mongooseStatements = () => {
    if (useMongoose) {
        dbMongooseInit().then(() => {
            mongoConnectionSuccess('Mongoose', 'mongoose')
            app.use('/mongoose', PatientMongooseRoute())
            app.use('/mongoose', NurseMongooseRoute())
            // should be at the end
            routeMain(app);
        })
        .catch (() => {mongoConnectionError()})
    }
}

// First promise
nodeHttpServerInit(app)
    .then(() => {
        mongooseStatements();
        mongoStatements();
    })
    .catch(() => {
        console.error('Error during the instatiation of the HTTP Server.' +
            ' Node is stopping with error code 16');
        process.exit(16);
    });
