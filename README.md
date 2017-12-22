# Utilisation
* If the application is compiled, `yarn start` or `npm start`.
* If the port 8080 is already in use, exit with error code 2.
* If you have forgotten to start MongoDB service, or if there is a problem
    to be connected to the database, the application exit with error code 3.


# Compilation
* This project use a Makefile

# Create a new Entity herited from Person
1. `cp -R patient nurse`
2. `sed -i -e 's/patient/nurse/g' *`
3. Change the model, and the json associated.
4. From the model, change the file route
4. Declare the route

# TODO
* Use an hot reload.
* entities/address is not used. Include it.
* regex for some req.body.*
* delete commonjs in tsconfig.js and other files.
* Implement an abstract dbMongo.service.ts
* Test if MongoDB is running
    https://stackoverflow.com/questions/39599063/check-if-mongodb-is-connected
    and adapt dbMongo.ts

# MongoDB
* See also http://mongodb.github.io/node-mongodb-native/2.2/tutorials/crud/
* See http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/
    (we have thought a lot of about this link, and remake the example with
    promise (not use callback))

# Routes implemented
See
* http://expressjs.com/en/guide/using-middleware.html#middleware.router
* http://expressjs.com/en/guide/routing.html

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

