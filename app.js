var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}))
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/myonline",()=>{
    console.log('Database connected')
})
var accountRouter = require('./account');
app.use('/api/account',accountRouter)

var categoryRouter = require('./category')
app.use('/api/admin',categoryRouter)

var productRouter = require('./seller');
app.use('/api/seller',productRouter);

var revRouter = require('./review');
app.use('/api/customer',revRouter)

app.listen(3000,()=>{
    console.log('Server starts')
})