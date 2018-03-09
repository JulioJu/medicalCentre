
// Some interesting examples to understand Promise and Observer mechamism
const subscribe = (observer: {next(x: any): void; complete(): void}) => {
// OR
/*
* function subscribe(observer: {next: (x:any) => void, complete:() => void}) {
*/
    const intervalID = setInterval(() => {
        observer.next('hi');
    }, 1000);
    console.log(observer);

    return () => {
        clearInterval(intervalID);
        observer.complete();
    };
};

const unsubscribe = subscribe({next: (x: any) => console.log(x),
    complete: () => {
        console.info('done');
    }
});

// Later:
// tslint:disable-next-line
setTimeout(unsubscribe(), 3000); // Dispose the resources.

const myPromise = new Promise<string>((res, rej) => {
    console.info('Corps promise');
    res('3');
});
// Promise is asynchrone
myPromise.then((x) => console.log('PromiseThen' + x));
const myFunc = (callback: any) => {
    console.info('Corps promise');
    if (!callback) {
        callback(3);
    }
};
myFunc((x: any) => console.info(x));
