var mongoose = require('mongoose');
var ReviewSchema = new mongoose.Schema({
    owner :{type : mongoose.Schema.Types.ObjectId,ref : 'user'},
    title : String,
    description : String,
    rating : {type : Number,default : 0},
    created : {type : Date,default : Date.now}
})

module.exports = mongoose.model('Review',ReviewSchema)
