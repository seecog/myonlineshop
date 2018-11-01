var mongoose = require('mongoose');
var express = require('express');
var User = require('./models/user.model')
var route = express.Router();
var jwt = require('jsonwebtoken');
var checkJWT = require("./middleware/check.jwt")
route.get('/users', (req, res) => {
    res.json({
        users: "We are comming"
    })
})

route.post('/users', (req, res) => {

    User.findOne({
        email: req.body.email
    }, (err, user) => {

        if (user) {
            res.json({
                success: false,
                message: 'User already present'
            })
        }
        else {
            var user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.isSeller = req.body.isSeller;
            user.save();
            res.json({
                success: true,
                message: "User registered successfully"
            })
        }
    })
})

route.get('/address', checkJWT, (req, res) => {
    console.log("varified user is ", req.decoded.user._id)

    User.findOne({
        _id : req.decoded.user._id
    },(err,user)=>{
if(err){
    console.log(err)
}
else{
    res.json({
        success : true,
        user : user.address
    })
}
    })
})

route.post('/address', checkJWT, (req, res) => {
    console.log("varified user is ", req.decoded.user._id)

    User.update({
        _id: req.decoded.user._id
    }, { address: req.body.address }, (err, user) => {
        res.json({
            success: true,
            message: "Address saved"
        })
    })
})

route.post('/login', (req, res) => {
    console.log('Inside login')
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, (err, user) => {
        console.log('user is ', user)
        if (user) {

            var token = jwt.sign({
                user: user
            }, "123456");
            res.json({
                success: true,
                message: token
            })
        }
        else {
            res.json({
                success: true,
                message: 'Login incorrect'
            })
        }
    })
})




module.exports = route;