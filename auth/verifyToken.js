const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    //console.log(req)
    const authHeader = req.headers.authorization;
    if(authHeader){
        token = authHeader.split(" ")[2];
        console.log(token)
        jwt.verify(token, process.env.JWT_SEC, (err,user) => {
            if (err)  return res.status(401).json("Token is expired!");
            req.user=user
            console.log("User is verified")
            next()
        })
    }    
    else {
        return res.status(401).json("You are not authenticated")
    }
};


const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req,res,()=>{
        if (req.user.id === req.params.id || req.user.isAdmin){
            console.log("User is authorized")
            next();
        }
        else
           res.status(403).json("You are not allowed to do that!") 
    })
};
module.exports = {verifyToken,verifyTokenAndAuthorization}



