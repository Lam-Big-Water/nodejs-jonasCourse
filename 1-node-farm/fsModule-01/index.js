// Blocking, synchronous way
const fs = require('fs');

const textIn = fs.readFileSync('./test.txt', 'utf-8');

console.log(textIn);


const textOut = `This is what we know about: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./test.txt', textOut);
console.log('File written!');