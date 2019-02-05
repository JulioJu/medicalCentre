import * as http from 'http';              // HTTP server
import * as https from 'https';            // HTTPS server
import * as express from 'express';        // The application server
import * as bodyParser from 'body-parser'; // Parse HTTP GET and POST variables
import * as path from 'path';              // Deal with system paths
import * as fs from 'fs-extra';            // Acces to files

const connectToServer = async (server: http.Server | https.Server,
        PORT: string | number): Promise<void> =>
    new Promise((res: () => void, rej: () => void): void => {
        let connectToPort = 0;
        // See solution at https://github.com/expressjs/express/issues/1569
        // See documentations
        // https://nodejs.org/api/http.html
        // https://nodejs.org/api/net.html#net_server_listen
        // https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
        server.on('error', (e: {code: string}) => {
            console.error('There is an error during',
                'the instatiation of the server',
                ' with port ', PORT, ' (error \'', e.code, '\').');
            if (e.code === 'EADDRINUSE') {
                console.info('Port ', PORT, ' in use, retrying... (n°',
                    connectToPort, ')');
                ++connectToPort;
                if (connectToPort > 3) {
                    console.error('More than 3 retrying with the port ', PORT,
                        ' (too much). It is in used.',
                        ' Therefore nodeJS will be stoped with error code 2.');
                    rej();
                } else {
                    setTimeout(() => {
                        // server.close();
                        server.listen(PORT);
                    }, 1000);
                    // process.exit(2);
                }
            } else {
                console.error(JSON.stringify(e));
            }
        });
        // https://nodejs.org/api/net.html#net_event_listening
        server.once('listening', (e: string) => {
            // console.log(e);
            console.info(`HTTP server running on port ${PORT}.`);
            res();
        });
        server.listen(PORT);
    });

export const nodeHttpServerInit =
    async (app: express.Application): Promise<void> => {

        // HTTP
        const portHTTP = process.env.portHTTP || 8080;
        const serverHTTP = http.createServer(app);
        try {
            await connectToServer(serverHTTP, portHTTP);
        } catch {
            return Promise.reject();
        }

        // HTTPS
        const portHTTPS = 8443;
        const TLS_SSL = {
            key : fs.readFileSync(path.join('./app/MM.pem')),
            cert: fs.readFileSync(path.join('./app/certificat.pem'))
        };
        const serverHTTPS = https.createServer(TLS_SSL, app);
        try {
            await connectToServer(serverHTTPS, portHTTPS);
        } catch {
            return Promise.reject();
        }

        // Configure the web server
        app.use(bodyParser.json()); // get information from html forms (post)
        app.use(bodyParser.urlencoded({extended: true})); // get
    };
