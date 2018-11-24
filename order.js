var express = require('express');
var route = express.Router();
var Order = require('./models/order.model')
var checkJWT = require('./middleware/check.jwt')
route.post('/orders',checkJWT,(req,res)=>{

console.log('The request is ',req.body)   
 var order = new Order();
 order.owner = req.decoded.user._id;;
 order.totalPrice = req.body.totalPrice;
 order.products = req.body.products;
 order.save();
 res.json({
     success : true,
     message : "Order Done"
 })

})

module.exports = route;