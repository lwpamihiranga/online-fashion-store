const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const productRouter = require('./routes/products');
const ratingRouter = require('./routes/ratings');

const app = express();

mongoose.connect('mongodb://localhost:27017/fashion_store', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/products', productRouter);
app.use('/api/ratings',ratingRouter);

app.use((req, res, next) => {
    const error = new Error();
    error.message = 'Not Found';
    next(error);
});

app.use((error, req, res, next) => {
    res.status(500).json({
        error: {
            message: error.message,
        },
    });
});

// app.listen(3000);
app.listen(3000, () => {
    console.log(`REST API on http://localhost:3000/api`);
});
