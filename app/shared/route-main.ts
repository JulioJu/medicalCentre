import * as express from 'express';             // The application server
import * as path from 'path';                   // Deal with system paths

export const routeMain = (app) => {

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

    app.get("/*", (req, res) => {
            res.status(404).send('Page not found');
    });

    // To serve static files such as images, CSS files, and JavaScript files,
    // use the express.static built-in middleware function in Express.
    // http://expressjs.com/en/starter/static-files.html
    const dataPath = path.join(__dirname, "/../app/data");
    console.log("dataPath" + dataPath);
    app.use('/data', express.static(dataPath));
};
