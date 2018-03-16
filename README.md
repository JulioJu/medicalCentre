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
* /#/ : home page.

## Create a service with Angular-cli
* To create a new module with its service and component. With Angular-cli
    1. `cd src/app/`
    2. `ng generate module ./entities/patient`
    3. `ng generate component ./entities/patient --module ./entities/patient/patient.module.ts`
    4. `ng generate service ./entities/patient/patient  --module ./entities/patient/patient.module.ts`

## TODO
* See if router-outler is the best directive for us.
* Check my issue https://github.com/jhipster/generator-jhipster/issues/7302#issuecomment-373763536

# TODO
* See [./tslint.yaml](./tslint.yaml) @todo.
* See section TODO in [./back/README.md](./back/README.md).
* See TODO in section [#Front-end](#Front-end) above.
