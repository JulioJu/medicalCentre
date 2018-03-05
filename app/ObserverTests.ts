
// Some interesting examples to understand Promise and Observer mechamism
function subscribe(observer: {next: (x:any)=>void, complete:()=>void}) {
    var intervalID = setInterval(() => {
        observer.next('hi');
    }, 1000);
    console.log(observer);

    return function unsubscribe() {
        clearInterval(intervalID);
        observer.complete();
    };
}

var unsubscribe = subscribe({next: (x: any) => console.log(x),
    complete: () => {
        console.info('done');
    }
});


// Later:
setTimeout(() => unsubscribe(), 3000); // dispose the resources

const myPromise = new Promise((res,rej) => {
    console.info('Corps promise');
    res('3');
} )
// Promise is asynchrone
myPromise.then((x) => {console.log('PromiseThen' + x);})
const myFunc = (callback: any) => {
    console.info('Corps promise');
    if (callback != null)
        callback(3);
}
myFunc((x: any) => console.info(x));
