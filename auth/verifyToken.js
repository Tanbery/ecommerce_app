const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    console.log("Verify Token In")
    const authHeader = req.headers.authorization;
    if(!authHeader){
        console.log("Verify Token Out")
        return res.status(401).json("There is no Authorization in header")
    }
    token = authHeader.split(" ")[1];
    if (token.trim() ==="") {
        console.log("Verify Token Out")
        return res.status(401).json("There is no token in header")
    }
        
    jwt.verify(token, process.env.JWT_SEC, (err,user) => {
        if (err) {
            console.log("Verify Token Out")
            return res.status(401).json("Token is expired!");
        } 
        req.user=user
        console.log("User is verified")
        console.log("Verify Token Out")
        next()
    })
};


const verifyTokenAndAuthorization = (req,res,next) => {
    console.log("Authorize In")
    verifyToken(req,res,()=>{
        if (req.user.id === req.params.id || req.user.isAdmin){
            console.log("User is authorized")
            console.log("Authorize Out")
            next();
        }
        else{
            console.log("Authorize Out")
            res.status(403).json("User is not authorized") 
        }
    })
};

const verifyTokenAndAdmin = (req,res,next) => {
    console.log("Admin In")
    verifyToken(req,res,()=>{
        if (req.user.isAdmin){
            console.log("User is admin")
            console.log("Admin Out")
            next();
        }
        else{
            console.log("Admin Out")
            res.status(403).json("User is not admin") 
        }
    })
};
module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}



