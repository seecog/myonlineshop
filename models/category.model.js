var mongoose = require('mongoose');
var categorySchema = new mongoose.Schema({
    name : {type : String,unique : true,lowercase : true},
    created : {type : Date , default : Date.now}
})

module.exports = mongoose.model('Category',categorySchema);
