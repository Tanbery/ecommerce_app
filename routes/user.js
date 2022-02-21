const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../auth/verifyToken");
const User = require("../models/User");
const { hideIt } = require("../utils/crypto");

const router= require("express").Router();


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

router.delete("/:id", verifyTokenAndAuthorization, async (req,res) =>{
    console.log("Delete User IN")
     try {
        await User.findByIdAndDelete(req.params.id)
        console.log("Delete User OUT")
        res.status(200).json("User is deleted");
    } catch (error) {
        console.log("Delete User OUT")
        res.status(500).json(error);
    }
} );

router.get("/:id", verifyTokenAndAdmin, async (req,res) =>{
    console.log("Get User IN")
     try {
        const usr = await User.findById(req.params.id)
        console.log("Get User OUT")
        const {password, ...others} = usr._doc;
        res.status(200).json(others);
    } catch (error) {
        console.log("Get User OUT")
        res.status(500).json(error);
    }
} );

module.exports = router
