import * as express from 'express';             // The application server
import * as semver from 'semver';
import { PatientMongoNativeRoute,
    PatientMongooseRoute } from './entities/patient';
import { NurseMongoNativeRoute, NurseMongooseRoute } from './entities/nurse';
import { nodeHttpServerInit, routeMain, dbMongoInit,
    dbMongooseInit } from './utils';
// You could instead use https://nodejs.org/en/docs/inspector/
// CommonJS module declaration because otherwise tsc raise false positive.
// tslint:disable:no-var-requires no-require-imports
require('console-info');
require('console-warn');
require('console-error');
require('../console-debug');

const app: express.Application = express();

console.debug(`This process is pid ${process.pid}`);

const nodeversion = process.versions.node;
console.info(`You use version ${nodeversion} of Node.js`);

// https://github.com/parshap/check-node-version/issues/6
// As in generator-jhipster
// https://github.com/jhipster/generator-jhipster/blob/00c59eca38ca43565d80fe00e1666875976b6cf9/generators/generator-base.js#L1837
if (semver.lte(nodeversion, '9.5.0')) {
    console.error('Please use a node >= 9.5.0');
    process.exit(20);
}

// https://nodejs.org/api/process.html#process_event_exit
process.on('exit', (code: number) => {
    console.debug(`This process have pid ${process.pid}`);
    console.info('If you run with npm or yarn, this process have one parent:',
        '"node /usr/bin/yarn" (or npm)',
        '. That\'s why when we type \`echo $?\' we might not have',
        'the exit code', code, ', but we have the exit code of yarn/npm.',
        'You could run directly `node ./appJS/server.js\'');
});

// Tests args
const mongonativeArg = 'mongonative';
const mongooseArg = 'mongoose';
const errorMessageArg = (): void => {
    console.error('You must use at least one database, either "'
        + mongonativeArg
        + '", or "' + mongooseArg + '"". You could use both.'
        + ' With Yarn you could write `yarn start ' + mongonativeArg + '\' or'
        + ' `yarn start ' + mongooseArg + '\' or'
        + ' `yarn start ' + mongonativeArg + ' ' + mongooseArg + '\'.'
    );
};
let useMongoose = false;
let useMongoNative = false;
if (process.argv.length !== 3 &&  process.argv.length !== 4) {
    errorMessageArg();
    process.exit(17);
} else {
    if (mongonativeArg === process.argv[2]
            || mongonativeArg === process.argv[3]) {
        useMongoNative = true;
    }
    if (mongooseArg === process.argv[2] || mongooseArg === process.argv[3]) {
        useMongoose = true;
    }
    if (!useMongoose && !useMongoNative) {
        errorMessageArg();
    }
}

const mongoConnectionSuccess = (name: string, url: string): void => {
    console.info('\n  ===================================\n',
    '| You use ' + name + '. \n',
    '| You could access to their functionnalities thanks URLs "/'
    + url + '/*"\n',
    '===================================\n');
};

const mongoConnectionError = (): void => {
    console.error('Cannot connect to the database. Maybe your'
        + ' MongoDB server is not running, or there is a'
        + ' problem with your'
        + ' database. NodeJS is stopping with error code 15.');
    process.exit(15);
};

const mongoStatements = async (): Promise<void> => {
    if (useMongoNative) {
        try {
            await dbMongoInit();
        } catch {
            mongoConnectionError();
            return Promise.reject();
        }
        mongoConnectionSuccess('bare MongoDB Node.JS Driver',
            'mongonative');
        app.use('/mongonative', PatientMongoNativeRoute());
        app.use('/mongonative', NurseMongoNativeRoute());
    }
    return Promise.resolve();
};

const mongooseStatements = async (): Promise<void> => {
    if (useMongoose) {
        try {
            await dbMongooseInit();
        } catch {
            mongoConnectionError();
            return Promise.reject();
        }
        mongoConnectionSuccess('Mongoose', 'mongoose');
        app.use('/mongoose', PatientMongooseRoute());
        app.use('/mongoose', NurseMongooseRoute());
    }
    return Promise.resolve();
};

const main = async (): Promise<void> => {
    try {
        await nodeHttpServerInit(app);
        await mongooseStatements();
        await mongoStatements();
        routeMain(app);
    } catch (e) {
        console.error('Error during the instatiation of the HTTP Server.' +
            ' Node is stopping with error code 16');
        process.exit(16);
    }
};

main()
    .then(() => console.info('All instantiated with success.'))
    .catch();
