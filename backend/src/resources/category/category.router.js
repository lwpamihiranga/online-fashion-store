const express = require('express');
const router = express.Router();

const CategoryController = require('./category.controller');
const Auth = require('../../utils/auth');

router.get('/', CategoryController.getAll);

/**
 * checkAdmin middleware check the user type for admin before creating a category
 */
// TODO: this route should be corrected to / only. REST API route system should be universal
router.post('/', Auth.checkAdmin, CategoryController.createOne);

module.exports = router;

