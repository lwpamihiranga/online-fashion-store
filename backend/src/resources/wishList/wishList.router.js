const express = require('express');
const router = express.Router();

const WishListController = require('./wishList.controller');

router.get('/', WishListController.getAll);
router.get('/find', WishListController.find);
router.post('/create', WishListController.createOne);
router.post('/delete', WishListController.deleteOne);

module.exports = router;
