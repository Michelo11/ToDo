const jwt = require('jsonwebtoken');

module.exports = { 
    authentication(req,res,next) {
        if (!req.headers.authorization) {
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        }

        jwt.verify(req.headers.authorization.split("Bearer ")[1],process.env.SECRET,(err, username)=>{
            if(err){
                res.status(401).json({
                    message: "Unauthorized"
                });
            } else{
                req.token = username;
                next();
            }
        });
    },
    sign(user,callback) {
        jwt.sign({ user: user }, process.env.SECRET,callback);
    }
}