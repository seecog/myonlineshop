var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Order = require('./models/order.model')
var checkJWT = require('./middleware/check.jwt')
route.post('/orders', checkJWT, (req, res) => {

    console.log('The request is ', req.body)
    var order = new Order();
    order.owner = req.decoded.user._id;;
    order.totalPrice = req.body.totalPrice;
    order.products = req.body.products;
    order.save();
    res.json({
        success: true,
        message: "Order Done"
    })

})

route.get('/orders', checkJWT, (req, res) => {
    Order.find({
        owner: req.decoded.user._id
    })
    .populate('owner')
    .deepPopulate('products.product')
    .exec((err, orders) => {
        if (err) {
            throw err;
        }
        res.json({
            success: true,
            orders: orders
        })
    })


})

module.exports = route;