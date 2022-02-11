const router= require("express").Router();
const User= require("../models/User");
const {hideIt, showIt} = require("../utils/crypto")
const jwt = require("jsonwebtoken");
const { decrypt } = require("../utils/crypto");



//Register
router.post("/register", async (req,res) =>{
    console.log("Register In")
    const newUser= new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: hideIt(req.body.password),
        }
        );
        try {
            // console.log(newUser)
            const savedUser=await newUser.save()
            // console.log(savedUser)
            res.status(201).send(savedUser);
        } catch (error) {
            res.status(500).json(error);
        }
        console.log("Register Out")
})

//Login
router.post("/login", async (req,res) =>{
    console.log("Login In")
    try {
        // is user exist?
        const user =await User.findOne({username: req.body.username});
        !user && res.status(401).json("Wrong credentials!");
        
        //is password correct?
        const pass = showIt(user.password);
        pass!== req.body.password &&  res.status(401).json("Wrong credentials!");
        
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, 
        process.env.JWT_SEC,
        {expiresIn:"3d"}
        );
        
        const {password, ...others} = user._doc;
        res.status(200).json({...others,accessToken})
    } catch (error) {
        res.status(500).json(error);
    }
    console.log("Login Out")
})

module.exports = router
