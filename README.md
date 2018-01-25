# Utilisation
* If the application is compiled, `yarn start` or `npm start`.
* If the port 8080 is already in use, exit with error code 2.
* If you have forgotten to start MongoDB service, or if there is a problem
    to be connected to the database, the application exit with error code 3.
* You should not have two same idSSN. My code check that idSSN should be UNIQUE.

# Compilation
* This project could use a Makefile
* **If you develop with VisualStudio Code, do not forget to instal vscode-tslint**.
* With Vim/Neovim, use the plugin ALE and
    `:let g:ale_typescript_tslint_config_path = 'tslint.json'`.
* If you have tslint available in your editor, you could run `yarn tscwatchNoLint`
    or `yarn tscwatchNoLint`.
* See also https://stackoverflow.com/questions/38276862/is-there-a-way-to-use-npm-scripts-to-run-tsc-watch-nodemon-watch

# Create a new Entity herited from Person
1. `cp -R patient nurse`
2. `sed -i -e 's/patient/nurse/g' *`
3. Change the model, and the json associated.
4. From the model, change the file route
4. Declare the route

# TODO
* ~~Use an hot reload~~. Done.
* Add an entity address.
* regex for some req.body.*. See:
    * https://docs.mongodb.com/manual/core/schema-validation/
    * https://mongodb.github.io/node-mongodb-native/api-generated/collection.html
* delete commonjs in tsconfig.js and other files.
* ~~ Implement an abstract dbMongo.service.ts ~~ Done.
* ~~Test if MongoDB is running
    https://stackoverflow.com/questions/39599063/check-if-mongodb-is-connected
    and adapt dbMongo.ts~~ Done.
* ~~In France, the Sécurité sociale use not the Social security number as key
    (too complex). Like them, do not use SSN. In file
    ./shared/abstract.entity.ts, add "id: number". Only with Mongo it seems not
    be possible to have a field UNIQUE, except if this field is the identifier.
    Use Mongoose or JSON Schema to resolve that.~~
    mongodb automatically add an identifier with field '_id'. my code check that
    idssn is unique.
* Secure abstract.service.ts against SQL injections.
* See how to secure server against XSS injection.
* In MongoDB 2.2 and MongoDB 3.0, save method is deprecated. Change method
    insertOrUpdateNested with method updateOne. Use behaviour of JHipster.
* Update to Node.js MongoDB Driver 3.0
* Publish console-debug in npm, or ask author of console.info to do this.
* Maybe try to use a logger…

# MongoDB
* See also http://mongodb.github.io/node-mongodb-native/2.2/tutorials/crud/
* See http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/
    (we have thought a lot of about this link, and remake the example with
    promise (not use callback))
* DO NOT USE DOCUMENTATION AT
    https://mongodb.github.io/node-mongodb-native/markdown-docs/
    BECAUSE IT'S A VERY OLD DOCUMENTATION.
    USE INSTEAD:
    https://mongodb.github.io/node-mongodb-native/

# Routes implemented
See
* http://expressjs.com/en/guide/using-middleware.html#middleware.router
* http://expressjs.com/en/guide/routing.html
* It's case insensitive.
* For the implementation, be careful to circular dependencies. See:
    * https://github.com/Microsoft/TypeScript/issues/21225#issuecomment-358593942

### Routes patients
(with express.Router middleware, Router-level middleware, could have
error-handling middleware)
* GET /patients (get all patients)
* PUT /patients (idempotent, so UPDATE and CREATE)
* GET /patients/:id (get the patient with id :id)
* DELETE /patients/:id (delete the patient with id :id)

### Routes nurses
(with express.Router middleware, Router-level middleware, could have
error-handling middleware)
* GET /nurses (get all nurses)
* PUT /nurses (idempotent, so UPDATE and CREATE)
* GET /nurses/:id (get the nurse with id :id)
* DELETE /nurses/:id (delete the nurse with id :id)

### Others routes
(with express route (app.get, etc.): application-level middleware)
* GET /
* GET /test
* GET /testParam
* GET /testParam2
* GET /* 404

