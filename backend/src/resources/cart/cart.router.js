const express = require('express');
const router = express.Router();

const CartController = require('./cart.controller');

router.get('/', CartController.getAll);
router.get('/find', CartController.find);

router.post('/create', CartController.create);
router.post('/delete', CartController.delete);
router.patch('/', CartController.update);

module.exports = router;
