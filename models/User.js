const mng = require("mongoose");

const userSchema = new mng.Schema(
    {
        username:{type: String, required: true,unique:true},
        email:      {type: String, required: true,unique:true},
        password: {type: String, required: true},
        isAdmin:{type: Boolean, required: true, default: false}
    },{timestamps:true}
)

module.exports = mng.model("User",userSchema);