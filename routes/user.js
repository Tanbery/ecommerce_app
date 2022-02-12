const {verifyTokenAndAuthorization } = require("../auth/token");
const User = require("../models/User");
const { hideIt } = require("../utils/crypto");

const router= require("express").Router();

//User Get
router.get("/:id", verifyTokenAndAuthorization, async (req,res) =>{
    console.log("user get IN")
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
    console.log("user get OUT")
} );

//User Update
router.put("/:id", verifyTokenAndAuthorization, async (req,res) =>{
    console.log("updateUser IN")
    if(req.body.password){
        req.body.password = hideIt(req.body.password)
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
    console.log("updateUser OUT")
} );

//delete user
router.delete("/:id", verifyTokenAndAuthorization, async (req,res) =>{
    console.log("user delete IN")
    try {
        await User.findByIdAndDelete(req.params.id) ;
        res.status(200).json("User is deleted");
    } catch (error) {
        res.status(500).json(error);
    }
    console.log("user delete OUT")
} );
module.exports = router
