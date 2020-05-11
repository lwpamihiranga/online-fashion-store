const express = require('express');
const router = express.Router();

const CategoryController = require('./category.controller');
const Auth = require('../../utils/auth');

router.get('/', CategoryController.getAll);

/**
 * checkAdmin middleware check the user type for admin before creating a category
 */
// TODO: this route should be corrected to / only. REST API route system should be universal
router.post('/create', Auth.checkAdmin, CategoryController.createOne);


    const catName = req.body.catName;

    if(catName != null)
    {
        let category = new categoryModel();
        category.catName = catName;

        category
            .save()
            .then(()=> res.json('Category was added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else
    {
        res.status(400).json('Error : parameters are missing!');
    }
});

module.exports = router;

