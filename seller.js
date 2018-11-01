var express = require('express');
var route = express.Router();
var Product = require('./models/product.model')
var checkJWT = require('./middleware/check.jwt')


route.delete('/products/:id',checkJWT,(req,res)=>{
    Product.remove({
        _id : req.params.id
    },(err,product)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({
                success : true,
                message : "Product deleted successfully"
            })
        }
    })
})

route.get('/category/:id',checkJWT, (req, res) => {
    Product.find({
        category: req.params.id
    })
        .populate('owner')
        .populate('category')
        .populate('reviews')
        .exec((err, products) => {
            res.json({
                success: true,
                products: products
            })
        })
})

route.get('/products/users', checkJWT, (req, res) => {
    Product.find({
        owner: req.decoded.user._id
    })
        .populate('owner')
        .populate('category')
        .populate('reviews')
        .exec((err, products) => {
            if (err) {
                console.log(err)
            }
            else {
                res.json({
                    success: true,
                    products: products
                })
            }
        })
})

route.post('/products', checkJWT, (req, res) => {
    var product = new Product();
    product.category = req.body.category;
    product.owner = req.decoded.user._id;
    product.image = req.body.image;
    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    product.save();
    res.json({
        success: true,
        message: 'Product saved successfully'
    })
})

module.exports = route;