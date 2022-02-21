const CryptoJS = require("crypto-js");

const hideIt = (exp)=>{
    return CryptoJS.AES.encrypt(exp,process.env.PASS_SEC).toString();
}

const showIt = (exp)=>{
    return CryptoJS.AES.decrypt(exp,process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
}

module.exports= {hideIt, showIt}