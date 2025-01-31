// File system
const fs = require('fs');

// Server
const http = require('http');

// Url
const url = require('url');

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
    
}

const tempOverview = fs.readFileSync(`${__dirname}/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/overview.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
console.log(dataObj);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    // Overview page
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el));
        console.log(cardsHtml);

        const output = tempOverview.replace('{%product-cards%}', cardsHtml);
        res.end(output);
    // Product page
    } else if (pathName === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(tempProduct);
    // API
    } else if (pathName === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>')
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});