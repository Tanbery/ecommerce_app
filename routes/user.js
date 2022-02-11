const { verifyToken, verifyTokenAndAuthorization } = require("../auth/verifyToken");
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

module.exports = router
