const express = require('express');
const router = express.Router();

const Product = require('./product.model');
const ProductController = require('./product.controller');
const FileHandler = require('../../utils/file-upload');


router.get('/findByCategoryId', (req, res) => {
    const id = req.query.id;
    Product.find({ categoryId: id })
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch((err) => {
            res.status(500).json({
                error: {
                    message: 'Cannot find',
                },
            });
        });
});

router.get('/findByProductId', (req, res) => {
    const id = req.query.id;
    Product.find({ _id: id })
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch((err) => {
            res.status(500).json({
                error: {
                    message: 'Cannot find',
                },
            });
        });
});



router
    .route('/')
    .get(ProductController.getAll)
    .post(FileHandler.single('imageLink'), ProductController.createOne);

router
    .route('/:id')
    .get(ProductController.getOne)
    .patch(ProductController.updateOne)
    .delete(ProductController.deleteOne);

router
    .route('/update')
    .get(ProductController.getAll)
    .post(FileHandler.single('imageLink'), ProductController.updateOne);




router.get('/:id', (req, res) => {
    const id = req.params.id;

    Product.findById(id)
        .exec()
        .then((doc) => {
            console.log(doc);

            if (doc) {
                res.status(200).json({
                    message: doc,
                });
            } else {
                res.status(404).json({
                    error: {
                        message: 'Unable to found',
                    },
                });
            }
        })
        .catch((err) => {
            console.log(err);

            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        categoryId : req.body.categoryId,
        description : req.body.description,
        name: req.body.name,
        price: req.body.price,
    });

    product
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: 'post for prodcuts',
                created: result,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ error: error });
        });
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Product.remove({ _id: id })
        .exec()
        .then((result) => {
            res.status(200).json({ result });
        })
        .catch((error) => {
            res.status(404).json({
                error: error,
            });
        });
});

module.exports = router;
