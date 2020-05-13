const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const databaseConnector = require('./utils/db');

const productRouter = require('./resources/product/product.router');
const ratingRouter = require('./resources/rating/rating.router');
const categoryRouter = require('./resources/category/category.router');
const userRouter = require('./resources/user/user.router');
const wishListRouter = require('./resources/wishList/wishList.router');
const cartRouter = require('./resources/cart/cart.router');

const app = express();
app.use('/src/utils/uploads', express.static('src/utils/uploads'));

app.use(morgan('dev'));
// app.use('/uploads', express.static('uploads')); // this middleware makes the uploads folder a static folder, so anyone can access it
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/products', productRouter);
app.use('/api/ratings', ratingRouter);
app.use('/api/category', categoryRouter);
app.use('/api/users', userRouter);
app.use('/api/wishList', wishListRouter);
app.use('/api/cart', cartRouter);

app.use((req, res, next) => {
    const error = new Error();
    error.message = 'route not Found';
    next(error);
});

app.use((error, req, res, next) => {
    res.status(500).json({
        error: {
            message: error.message,
        },
    });
});

// app.listen(5000);
app.listen(5000, () => {
    databaseConnector.connectDatabase();
    console.log(`REST API on http://localhost:5000/api`);
});
