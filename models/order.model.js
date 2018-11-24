var mongoose = require('mongoose');
var OrderSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    totalPrice : {type : Number , default : 0},
    products : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
        }
    ]
})

module.exports = mongoose.model('Order',OrderSchema);

