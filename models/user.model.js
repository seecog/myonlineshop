var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    email : String,
    name : String,
    password : String,
    picture : {type : String},
    isSeller :{type : Boolean,default : false},
    address : {
        addr1 : String,
        addr2 : String,
        city : String,
        state : String,
        country : String,
        postalCode : String
    },
    created : {type : Date,default : Date.now}
})

module.exports = mongoose.model('User',UserSchema);