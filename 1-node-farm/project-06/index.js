// File system
const fs = require('fs');

// Server
const http = require('http');

// Url
const url = require('url');

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%productname%}/g, product.productName);
    output = temp.replace(/{%image%}/g, product.image);
    output = temp.replace(/{%price%}/g, product.price);
    output = temp.replace(/{%from%}/g, product.from);
    output = temp.replace(/{%nutrients%}/g, product.nutrients);
    output = temp.replace(/{%quantity%}/g, product.quantity);
    output = temp.replace(/{%description%}/g, product.description);
    output = temp.replace(/{%id%}/g, product.id);

    if (!product.organic) output = output.replace(/{%not_organic%}/g, 'not-organic');

    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/overview.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    // Overview page
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
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