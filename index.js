require("dotenv").config();
const express= require("express");
const app = express();

const mng = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./auth/auth");

app.use(express.json())
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

mng.connect(
    process.env.MONGO_URL
    ).then(()=>{
        console.log("MongoDB Connection is Successful")
    }).catch((err)=>{
        console.log(err)
    });

app.get("/api/test", (req,res)=>{
    console.log("test is successful");
    res.send("test is successful");
})

const listen_port =process.env.LISTEN_PORT || 5000;
app.listen(listen_port, ()=>{
    console.log("Backend server is running at " + listen_port);
})