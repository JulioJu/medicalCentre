// tslint:disable:max-line-length

// tslint:disable:no-unsafe-any

// =====
// | Notes |
// =====
// DO NOT FORGET TO COMPILE BEFORE USE IT WITH NODE
//  * Be careful, Observer and Observable with RxJS havn't the same design
//      pattern as in JAVA. (see
//      https://docs.oracle.com/javase/9/docs/api/java/util/Observable.html
//      vs
//      http://reactivex.io/rxjs/manual/overview.html#observables-as-generalizations-of-functions
//  * Therefore Observable differs of EventEmitter
// `tsc ObservertTest.ts`

// // =========================
// // | VANILLA Observable / Observer |
// // =========================
// / SEE
// http://reactivex.io/rxjs/manual/overview.html#disposing-observable-executions
// // Some interesting examples to understand Promise and Observer mechamism
// const subscribe = (observer: {next(x: any): void; complete(): void}) => {
// // OR
// #<{(|
//* function subscribe(observer: {next: (x:any) => void, complete:() => void}) {
// |)}>#
// // OR
// #<{(|
//* function subscribe(observer: {next: (x:any) => void, complete:() => void}) {
// * const subscribe = Rx.Observable.create(function (observer) {
// |)}>#
//     const intervalID = setInterval(() => {
//         observer.next('hi');
//     }, 1000);
//     console.log(observer);
//
//     return () => {
//         clearInterval(intervalID);
//         observer.complete();
//     };
// };
//
// const unsubscribe = subscribe({next: (x: any) => console.log(x),
//     complete: () => {
//         console.info('done');
//     }
// });
//
// // tslint:disable-next-line
// setTimeout(() => unsubscribe(), 3000); // Dispose the resources.

// | ————— |
// | Event |
// | ————— |

// tslint:disable-next-line
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
}
const myEmitter = new MyEmitter();
// subsbscibe to « next » event
myEmitter.on('next', (): void => {
    console.log('firstEventListener');
});
// subsbscibe to « next » event 4 second after
setTimeout(() => myEmitter.on('next', (): void => {
    console.log('secondEventListener');
}), 4000);
// Emit « next» event: PRINT AT THE SAME TIME.
setTimeout(() => myEmitter.emit('next'), 8000);

// | ————— |
// | Event vs Observable |
// | ————— |

// Here I use vanilla Observer / Observable
// You could use also RxJS library
// See
// http://reactivex.io/rxjs/manual/overview.html#disposing-observable-executions

// See:
// http://reactivex.io/rxjs/manual/overview.html#observables-as-generalizations-of-functions
// Here we demonstrate than:
// « Contrary to popular claims, Observables are not like EventEmitters nor are
// « they like Promises for multiple values. Observables may act like
// « EventEmitters in some cases, namely when they are multicasted using RxJS
// « Subjects, but usually they don't act like EventEmitters.
// « (…)
// « As opposed to EventEmitters which share the side effects and have eager
// « execution regardless of the existence of subscribers, Observables have no
// « shared execution and are lazy.

// tslint:disable:prefer-method-signature
// // Some interesting examples to understand Promise and Observer mechamism
// OR const observable = Rx.Observer.create(observer) => {
const observableSubscribe = (observer: {next: (x: string) => void}): void => {
    // Emit « next» 10 second after the start : NOT PRINT AT THE SAME TIME
    setTimeout(() => observer.next('a'), 10000);
};
// « subscribe »
// OR observable.subscribe({next: (x) => {
observableSubscribe({next: (x: string): void => {
    console.log('firstObsListener');
}});
// « subscribe » 4 second after the start
setTimeout(() => observableSubscribe({next: (x: string): void => {
    console.log('secondObsListener');
}}), 4000);

// // ============
// // | Promises |
// // ============
//
// const myPromise = new Promise<string>((res, rej) => {
//     console.info('Corps promise');
//     res('3');
// });
// // Promise is asynchrone
// myPromise.then((x) => console.log('PromiseThen' + x));
// const myFunc = (callback: any) => {
//     console.info('Corps promise');
//     if (!callback) {
//         callback(3);
//     }
// };
// myFunc((x: any) => console.info(x));
