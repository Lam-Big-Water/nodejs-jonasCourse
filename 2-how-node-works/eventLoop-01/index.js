const fs = require("fs");

setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
    console.log('I/O finished');
    console.log('------------');


    setTimeout(() => console.log('T 2 F'), 0);
    setTimeout(() => console.log('T 3 F'), 3000);
    setImmediate(() => console.log('IT 2 F'));

    process.nextTick(() => console.log('PN'));

})

console.log('Hello');