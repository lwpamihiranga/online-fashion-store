const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');
const ratingModel = require('../models/rate.model');

router.get('/', (req, res) => {
   ratingModel.find()
       .then(ratings => res.status(200).json(ratings))
       .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/create',(req,res) => {

   const userId = req.body.userId;
   const productId = req.body.productId;
   const comment = req.body.comment;
   const rate = req.body.rate;

   if(userId != null && productId != null && comment != null && rate != null)
   {

      let rating = new ratingModel();
      rating.userId = userId;
      rating.productId = productId;
      rating.comment = comment;
      rating.rate = rate;

      rating
          .save()
          .then(()=> res.json('Rating was added!'))
          .catch(err => res.status(400).json('Error: ' + err));
   }
   else
   {
      res.status(400).json('Error : parameters are missing!');
   }


});

module.exports = router;