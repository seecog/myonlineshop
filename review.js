var express = require('express');
var mongoose = require("mongoose");
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var route = express.Router();
var Product = require('./models/product.model')
var Review = require('./models/review.model')
var checkJWT = require('./middleware/check.jwt')
route.post('/reviews',checkJWT,(req,res)=>{
    
    Product.findOne({_id : req.body.productId}).deepPopulate('reviews').exec((err, product)=> {
        console.log("The product list is ",product)


        var review = new Review();
        review.owner = req.decoded.user._id;
        review.title = req.body.title;
        review.description = req.body.description;
        review.rating = req.body.rating;
        console.log('The review is ',review)
        product.reviews.push(review);
        product.save();
        res.json({
            success : true,
            message : "Review saved"
        })
           



      });
    
    
    
//     Product.findOne({
// _id : req.body.productId
//     },(err,product)=>{
// var review = new Review();
// review.owner = req.decoded.user._id;
// review.title = req.body.title;
// review.description = req.body.description;
// review.rating = req.body.rating;
// product.reviews.push(review);
// product.save();
// res.json({
//     success : true,
//     message : "Review saved"
// })
    // })
})

module.exports = route;