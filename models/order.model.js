var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var OrderSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalPrice: { type: Number, default: 0 },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: { type: Number, default: 1 }
        }
    ]
})
OrderSchema.plugin(deepPopulate);
module.exports = mongoose.model('Order', OrderSchema);

