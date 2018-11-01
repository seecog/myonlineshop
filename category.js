var express = require('express');
var route = express.Router();
var Category = require('./models/category.model')
var checkJWT = require('./middleware/check.jwt')
route.post('/categories',checkJWT, (req, res) => {
    var category = new Category();
    category.name = req.body.name;
    category.save();
    res.json({
        success: true,
        message: "category created successfully"
    })
})

route.put('/categories/:id',checkJWT,(req,res)=>{
    Category.update({
        _id : req.params.id
    },req.body,(err,category)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({
                success : true,
                message : "Category updated successfully"
            })
        }
    })
})

route.delete('/categories/:id',checkJWT,(req,res)=>{
    Category.remove({
        _id : req.params.id
    },(err,category)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({
                success : true,
                message : "Category deleted successfully"
            })
        }
    })
})

route.get("/categories",checkJWT, (req, res) => {
    Category.find({}, (err, categories) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json({
                categories: categories
            })
        }
    })
})

module.exports = route;
