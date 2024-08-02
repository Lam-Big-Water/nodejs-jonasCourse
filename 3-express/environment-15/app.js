const express = require('express');
// 3rdParty middleware
const morgan = require('morgan');

const tourRouter = require('./tourRoutes');
const userRouter = require('./userRoutes');

const app = express();

// middleware
console.log(process.env.NODE_ENV);
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// Routes
    app.use('/api/v1/tours', tourRouter);
    app.use('/api/v1/users', userRouter);

module.exports = app;