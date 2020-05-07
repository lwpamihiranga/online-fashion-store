const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');
const ratingModel = require('./rating.model');

router.get('/', (req, res) => {
   ratingModel.find()
       .then(ratings => res.status(200).json(ratings))
       .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/create',(req,res) => {

   const userId = req.query.userId;
   const productId = req.query.productId;
   const comment = req.query.comment;
   const rate = req.query.rate;

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

router.get('/findByProductId', (req, res) => {

   const productId = req.query.productId;
   ratingModel.find({productId : productId})
       .then(ratings => res.status(200).json(ratings))
       .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/findByUserAndProductId', (req, res) => {

   const productId = req.query.productId;
   const userId = req.query.userId;
   ratingModel.find({productId : productId,userId : userId})
       .then(ratings => res.status(200).json(ratings))
       .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update', (req, res) => {

   const rateId = req.query.rateId;
   const newComment = req.query.comment;
   const newRate = req.query.rate;

   ratingModel.update({_id: rateId}, {comment: newComment, rate: newRate})
       .then(()=> res.json('Rating Updated!').sendStatus(200))
       .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/delete', (req, res) => {

   const rateId = req.query.rateId;

   ratingModel.deleteOne({_id: rateId})
       .then(()=> res.json('Rating Deleted!').sendStatus(200))
       .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;