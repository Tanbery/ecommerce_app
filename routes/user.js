<<<<<<< HEAD
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../auth/verifyToken");
=======
const {verifyTokenAndAuthorization } = require("../auth/token");
>>>>>>> 854579a246f8062a6bd1cb4d0a98f765e1e0cd89
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

<<<<<<< HEAD
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

=======
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
>>>>>>> 854579a246f8062a6bd1cb4d0a98f765e1e0cd89
module.exports = router
