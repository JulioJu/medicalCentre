# DEPRECATED
* Use instead https://nodejs.org/en/docs/inspector/
* The addon Node.js V8 doesn't work with Chromium. It's a shit !
* Use too Open-as-Popup to doesn't show the shit ~~Google Chrome~~ layout !
* ~~TODO try to use Firefox debugger instead, but I've not found really cool
    documentation on it.~~. There is
    https://github.com/devtools-html/debugger.html/blob/master/docs/getting-setup.md#starting-node.
    I've tested but doesn't seems to work well.

# console.debug :

 ![console-debug demo](https://raw.githubusercontent.com/rathath/bucket/master/img/console-debug-node.png)

- The purpose of this module is not to give many options for logging , it is just give you lightweight the missing API of console : which is here `console.debug`.

- No need documentation, because `console.debug` takes the same arguments as `console.log` . However `console.debug` will be displayed on terminal like below.

# Install :

TODO

# How to use :

```js
require('console-debug');
// or in babel: import debug from 'console-debug';

console.debug(new Date()); // log time now
console.debug({firstname: "Abdesslem", age:32}) ; // log Object
console.debug(new Date,[4, 65, 9], {a:"b"}); // I told you : it is like console.log
```



# Related modules :

Use also :

- [**console.warn**](https://www.npmjs.com/package/console-warn)

- [**console.error**](https://www.npmjs.com/package/console-error)

```
npm install console-warn --save;
npm install console-error --save;
```
