const mng = require("mongoose");

const orderSchema = new mng.Schema(
    {
        userId:{type: String, required: true},
        products:[
            {
                productId: {type: String},
                quantity: {type:Number, default:1}
            }
        ],
        amount: {type:Number,required: true},
        adress:{type: Object, required: true},
        status: {type: String, default:"pending"},
    },{timestamps:true}
)

module.exports = mng.model("Order",orderSchema);