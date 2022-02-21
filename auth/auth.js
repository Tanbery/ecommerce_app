const router= require("express").Router();
const jwt = require("jsonwebtoken");
const {hideIt, showIt} = require("../utils/crypto")
const User= require("../models/User");

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
        const user =await User.findOne({username: req.body.username});
        if(!user) {
            console.log("Login Out")
            res.status(401).json("Wrong credentials!");
            return ;
        }
               
        const pass = showIt(user.password);
        if (pass!== req.body.password )  {
            console.log("Login Out")
            res.status(401).json("Wrong credentials!");
            return ;
        }
        
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, 
        process.env.JWT_SEC,
        {expiresIn:"3d"}
        );
        
        const {password, ...others} = user._doc;
        console.log("Login Out")
        res.status(200).json({...others,accessToken})
        return ;
    } catch (error) {
        console.log("Login Out")
        res.status(500).json(error);
        return;
    }
})

module.exports = router
