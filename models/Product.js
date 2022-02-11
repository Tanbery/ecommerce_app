const mng = require("mongoose");

const productSchema = new mng.Schema(
    {
        title:{type: String, required: true,unique:true},
        desc:{type: String, required: true},
        img: {type: String, required: true},
        categories:{type: Array, required: true},
        size:{type: String},
        color:{type: String},
        price:{type: Number, required: true}

    },{timestamps:true}
)

module.exports = mng.model("Product",productSchema);