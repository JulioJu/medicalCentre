`node server.ts` ==>

```
/home/julioprayer/DCISS/Cabinet_medical/M2MIASHS-cabinet/AnotherCircularDependenciesError/entities/nurse/nursemodel.js:4
class Nurse extends person_1.Person {
                             ^

TypeError: Class extends value undefined is not a constructor or null
    at Object.<anonymous> (/home/julioprayer/DCISS/Cabinet_medical/M2MIASHS-cabinet/AnotherCircularDependenciesError/entities/nurse/nursemodel.js:4:30)

```

BUG: Circular dependencies between abstract.service.ts and
db-mongoose.init.ts through other files, especially index.js.

In same way as  https://github.com/Microsoft/TypeScript/issues/21225
If we inverse lines in server.ts fix problem.

To fix that, we  must break circular dependencies thanks:
* delete `const utils_1 = require("../../utils");` in abstract.model.ts
* or in abstract.service.js declare:
    * `const utils_1 = require("../../utils/fileIWant");`
    * But no: `const utils_1 = require("../../utils/db-mongoose.init");`

The problem is even if db-mongoose.init.js not loads directly abstract.service.js,
`require("../entities/nurse");` loads all files declared in abstract/index.js,
like abstract.service.js. Indeed, db-mongoose.init.js loads
nurse.model.js, who loads all files in  person.model.ts who
loads abstract/* and especially db-mongoose.init.js. We have a circular
dependency. If nurse.model.ts have
`const person_1 = require("../directly");` : no problem: node should be clever
when there is few files implicated in the circular dependency.

We could read « The compiler makes no grantees in the face of circular imports.
» (https://github.com/Microsoft/TypeScript/issues/21225)
