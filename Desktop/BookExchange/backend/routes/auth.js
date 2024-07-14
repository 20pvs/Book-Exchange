const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Jwt_secret} = require("../keys");
const requireLogin = require('../middlewares/requireLogin');

router.get('/',(req,res)=>{
    res.send("hello")
})

// router.get("/createPost",requireLogin,(req,res)=>{
//     console.log("Amit Auth")
// })

router.post("/signup", (req, res) => {
    const {name, userName, email, password} = req.body;
    if (!name || !userName || !email || !password) {
        return res.status(422).json({error:"please add all the field"})
    }
    USER.findOne({$or:[{email:email},{userName:userName}]}).then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error:"User already exist with that email or username!!!"})
        }
        bcrypt.hash(password, 12).then((hashedPassword)=>{
            const user = new USER({
                name,
                userName,
                email,
                password:hashedPassword
            })
        
            user.save()
            .then(user => {res.json({message:"Registed succesfully"})})
            .catch(err => {console.log(err)})
        })
        
    })

    
    

})

router.post("/signin", (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(422).json({error:"Please fill email and password"})
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email"})
        }
        bcrypt.compare(password, savedUser.password).
        then((match)=>{
            if(match){
                //return res.status(422).json({message:"Signed in Successfully"})
                const token = jwt.sign({_id:savedUser.id},Jwt_secret)
                res.json(token)
                console.log(token)
            }else{
                return res.status(422).json({error:"Invalid Email or Password"})
            }
        })
        .catch(err=> console.log(err))
    })
})

module.exports = router;