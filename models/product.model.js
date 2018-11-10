var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var ProductSchema = new mongoose.Schema({
    category : {type : mongoose.Schema.Types.ObjectId,ref : 'Category'},
    owner : {type : mongoose.Schema.Types.ObjectId,ref : 'User'},
    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    image : String,
    title : String,
    description : String,
    price : Number,
    created : {type : Date,default : Date.now}
})

ProductSchema.plugin(deepPopulate);
module.exports = mongoose.model('Product',ProductSchema);
