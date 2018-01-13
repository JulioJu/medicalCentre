import * as http from 'http';                   // HTTP server
import * as https from 'https';                 // HTTPS server
import * as express from 'express';             // The application server
import * as bodyParser from 'body-parser';      // Parse HTTP GET and POST variables
import * as path from 'path';                   // Deal with system paths
import * as fs from 'fs-extra';                 // Acces to files

const connectToServer = (resolve, reject, server, PORT) => {
    let connectToPort = 0;
    // See solution at https://github.com/expressjs/express/issues/1569
    // See documentations
    // https://nodejs.org/api/http.html
    // https://nodejs.org/api/net.html#net_server_listen
    // https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
    server.on('error', (e: any) => {
        console.log('There is an error during the instatiation of the server'
            + ' with port ' + PORT + " (error \"" + e.code + "\").");
        if (e.code === 'EADDRINUSE') {
            console.log('Port ' + PORT + ' in use, retrying... (n°'
                + connectToPort + ')');
            ++connectToPort;
            if (connectToPort > 3) {
                console.log("More than 3 retrying with the port " + PORT +
                    " (too much). It is in used." +
                    " Therefore nodeJS will be stoped with error code 2.");
                reject();
            }
            else {
                setTimeout(() => {
                    // server.close();
                    server.listen(PORT, null);
                }, 1000);
                // process.exit(2);
            }
        }
    });
    // https://nodejs.org/api/net.html#net_event_listening
    server.once('listening', (e: any) => {
        // console.log(e);
        console.log(`HTTP server running on port ${PORT}.`);
        resolve();
    });
    server.listen(PORT, null);
};

export const nodeHttpServerInit = (app: express.Application): Promise<any> => {
    return new Promise((resolve, reject) => {

        // HTTP
        const portHTTP = process.env.portHTTP || 8080;
        const serverHTTP = http.createServer(app);
        connectToServer(resolve, reject, serverHTTP, portHTTP);

        // HTTPS
        const portHTTPS = 8443;
        const TLS_SSL =	{
            key : fs.readFileSync( path.join("./app/MM.pem"		 )),
            cert: fs.readFileSync( path.join("./app/certificat.pem"))
        };
        const serverHTTPS = https.createServer(TLS_SSL, app);
        connectToServer(resolve, reject, serverHTTPS, portHTTPS);

        // Configure the web server
        app.use(bodyParser.json()); // get information from html forms (post)
        app.use(bodyParser.urlencoded({extended: true})); // get
    });
}

