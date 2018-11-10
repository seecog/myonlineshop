var express = require('express');
var mongoose = require("mongoose");
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var bodyparser = require('body-parser');

var route = express.Router();
var Product = require('./models/product.model')
var Review = require('./models/review.model')
var checkJWT = require('./middleware/check.jwt')

route.post('/pankajtest',(req,res)=>{
    console.log('The data is ',req.body)
})

route.post('/reviews',checkJWT,(req,res)=>{
    console.log('The product id is ** ',req.body)
    Product.findOne({_id : req.body.productId}).deepPopulate('reviews').exec((err, product)=> {
        console.log("The product serach id is ",product)


        var review = new Review();
        review.owner = req.decoded.user._id;
        review.title = req.body.title;
        review.description = req.body.description;
        review.rating = req.body.rating;
        review.save();
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