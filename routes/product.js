const router= require("express").Router();

router.post("/", verifyTokenAndAdmin, async (req,res) =>{
    console.log("product post IN")
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
    console.log("product post OUT")
} );

module.exports = router
