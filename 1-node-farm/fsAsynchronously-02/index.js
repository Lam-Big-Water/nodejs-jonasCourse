const fs = require('fs');
// Non-blocking, asynchronous way
fs.readFile('./start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log('Error');
    fs.readFile(`./${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);

        fs.writeFile('./final.txt', `${data1}\n${data2}`, 'utf-8', err => {
            console.log('Your file has been written');
        })
    });
});
console.log('Will read file!');