const mng = require("mongoose");

const cartSchema = new mng.Schema(
    {
        userId:{type: String, required: true},
        products:[
            {
                productId: {type: String},
                quantity: {type:Number, default:1}
            }
        ]
    },{timestamps:true}
)

module.exports = mng.model("Cart",cartSchema);