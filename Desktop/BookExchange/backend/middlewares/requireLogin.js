const jwt = require("jsonwebtoken")
const {Jwt_secret} = require("../keys")
const mongoose = require("mongoose")
const USER = mongoose.model("USER")

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must have to Logged in 1"})
    }
    const token = authorization.replace("amit ","")
    jwt.verify(token,Jwt_secret,(err, payload)=>{
        if(err){
            return res.status(401).json({error:"You must have to Logged in 2"})
        }
        const {_id} = payload
        USER.findById(_id).then(userData=>{

            req.user = userData
            next()
        })
    })
}