const router= require("express").Router();
const User= require("../models/User");
const {hideIt, showIt} = require("../utils/crypto");
const {createToken } = require("./token");

//Register
router.post("/register", async (req,res) =>{
    // console.log("Register In")
    const newUser= new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: hideIt(req.body.password),
        }
        );
        try {
            const savedUser=await newUser.save()
            res.status(201).send(savedUser);
        } catch (error) {
            res.status(500).json(error);
        }
        // console.log("Register Out")
})


router.post("/login", async (req,res) =>{
    console.log("Login In")
    try {
        // is user exist?
        const user =await User.findOne({username: req.body.username});
        if(!user){
            res.status(401).json("Wrong credentials!"); 
            return;
        } 
        const pass = showIt(user.password);
        if (pass!== req.body.password )  {
            res.status(401).json("Wrong credentials!"); 
            return;
        }
        
        accessToken = createToken({ id: user._id, isAdmin: user.isAdmin});  //console.log(accessToken);
        const {password, ...others} = user._doc;
        res.status(200).json({...others,accessToken})
    } catch (error) {
        res.status(500).json(error);
    }
    console.log("Login Out")
})

module.exports = router
