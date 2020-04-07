const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Product = require('../models/product')

router.get('/', (req, res) => {
    Product.find().exec()
    .then(docs => {
            res.status(200).json(docs)
    
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: "Cannot find"
            }
        })
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Product.findById(id).exec()
    .then(doc => {
        console.log(doc)

        if(doc) {
            res.status(200).json({
                message: doc
            })
        } else {
            res.status(404).json({
                error: {
                    message: "Unable to found"
                }
            })
        }
      
    }).catch(err => {
        console.log(err)

        res.status(500).json({error: err})
    })

  
})

router.post('/', (req, res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'post for prodcuts',
            created: result
        })
    }).catch(error => {
        console.log(error)
        res.status(400).json({error: error})
    })


})

router.patch('/:id', (req, res) => {
    const id = req.params.id;

    const updateOps = {}
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({_id: id}, { $set: updateOps}).exec()
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(400).json({
            error: error
        })
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Product.remove({_id: id}).exec()
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => {
        res.status(404).json({
            error: error
        })
    })
})

module.exports = router;