« Cabinet medical » project.
# Back-end
* See folder [./back](./back). Built with Typescript and Express.
* See README written by me in [./back/README.md](./back/README.md).
* It serves at http://localhost:8080/ or at https://localhost:8433/.

# Front-end
* See folder [./front](./front). Built with Angular.
* Folder tree and routing is a little bit inspired from JHipster 4.14.0.
* In dev mode, it serves at http://localhost:4200/.

## Routes
* Routes describe in [./back/README.md#Routes](./back/README.md#Routes) work thanks proxy [./front/proxy.conf.json](./front/proxy.conf.json).
* /#/patients : GET all patients.
* /#/nurses : GET all nurses.
* /#/patient/:id : GET patient with id ":id"
* /#/nurse/:id : GET nurse with id ":id"
* Deletions:
    * Parameters:
        * `:id` is mandatory.
        * `confirmation` and `stateDeletion` are matrix parameters,
            (therefore optionals).
        * `stateDeletion` could have value:
            * "notTried"(display button to delete in the page)
            * "deleted" (button to delete not displayed)
            * "error" (display error message, button to delete not displayed)
            * Default "notTried".
        * `confirmation` could have value "true" or "false". If true, delete
            immediately. Default: false.
    * Routes:
        * /#/patient-delete/:id;confirmation=boolean:stateDeletion=string; :
            delete patient with id ":id"
        * /#/nurse-delete/:id;confirmation=boolean:stateDeletion=string; :
            delete nurse with id ":id"
* /#/patient-form-proto : create a new patient (just for a form prototype, do
    nothing)
* /#/patient-form : create a new patient
* /#/nurse-form : create a new patient
* /#/ : home page.

N.B. Form fields are cached in SessionStorage to prevent the loss of data
    during navigation or page reload without submit.
    It's the default behaviour in Firefox for a simple HTML form (not Angular).
    For fields with value non empty, Angular Validation is performs.

## Create a service with Angular-cli
* To create a new module with its service and component. With Angular-cli
    1. `cd src/app/`
    2. `ng generate module ./entities/patient`
    3. `ng generate component ./entities/patient --module ./entities/patient/patient.module.ts`
    4. `ng generate service ./entities/patient/patient  --module ./entities/patient/patient.module.ts`

# Observables
* I've wrote a good example to understand Observer and Observable with RxJS.
    See [./back/app/ObserverTests.ts](./back/app/ObserverTests.ts)
    * Be careful, Observer and Observable with RxJS havn't the same design
        pattern as in JAVA:
        (https://docs.oracle.com/javase/9/docs/api/java/util/Observable.html vs
        http://reactivex.io/rxjs/manual/overview.html#observables-as-generalizations-of-functions)
    * Therefore Observable differs of EventEmitter
* When unsubscribe?
    * See: https://github.com/angular/angular/issues/22410

# TODO

## Secondary TODO

* For GET, add infinite scroll (example on JHipster).
* Add an eventSuscriber to subscribe to modifications (example on JHipster).
* Maybe use paramMap instead of params as explained
    https://angular.io/guide/router. But JHipster 5.0.0 use params, probably
    enough.
* See if router-outlet is the best directive for us.
* For Nurses add UNIQUE contraint in mongodb. Maybe it
    should not have two nurses with the same firstname or lastname.
    In Decathlon, it could have two persons with the same firstname and
    lastname (I've had two cards).

## Principal TODO

* <!-- * See [./tslint.yaml](./tslint.yaml) @todo. -->
* See section TODO in [./back/README.md](./back/README.md).
* <!-- Check my issue https://github.com/jhipster/generator-jhipster/issues/7302#issuecomment-373763536 --> Done
* Improve message error "duplicate key" in dynamic-form (like iSSN duplication
    key in /patient-form)

## Ask to teacher
* Subtyping is it better than Parametric polymorphism ? See
    ./front/src/app/entities/patient/patient-form.dynamic-form.component.ts
    and the commit of 08/02/2018 08 h 31 UTC + 2
    (Ask to the teacher)
* in dynamic-form.component.html, and abstract.dynamic-form.ts, is it good
    to inject message error thanks:
    ```
    const docErrorForm = document.getElementById('errorForm');
    if (docErrorForm) {
        docErrorForm.appendChild(
            document.createTextNode(
                'ERROR: ' + err.error.error_message
            )
        );
        docErrorForm.style.display = 'block';
    }
    ```
    Maybe we could also use an Angular service, like in JHipster
        or
    http://jasonwatmore.com/post/2017/06/25/angular&#45;2&#45;4&#45;alert&#45;toaster&#45;notifications
    Probably it's better if we have different sorts of messages. But me
    I've actually only two sorts of messages in two different pages:
    success and error (futur TODO).

# Notes for developpers

* BIG WARNING:https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
    * « The pattern is not surrounded by forward slashes. »
        Chrome doesn't respect the specification, contrary to Firefox.
    * « Use the title attribute to describe the pattern to help the user. »
* For input attribute:
    * "attr." prefix seems bypass any angular conversion.
        * [required] attribute is converted to "ng-reflect-required"
        * [attr.required] gives "required"
* Fields could be cached in SessionStorage. Do not use SessionStorage to cache
    sensitive datas like passwords (be careful).

