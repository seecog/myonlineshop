var jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
var token = req.headers['token'];
console.log('the token is ',token)
if(token){
var decoded=jwt.verify(token,"123456");
console.log('Decoded ',decoded);
req.decoded = decoded;
next();
}
else{
    res.json({
        message : "Token not present"
    })
}
}