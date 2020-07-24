const express=require('express')
const auth = require('../middleware/auth')
const router=new express.Router()
const User=require('../models/User')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const config=require('../config/default.json')

//@rout    GET/auth
//@desc    Test rout
//@access  private

router.get('/auth',auth,async (req,res)=>{
    try {
        const user=await User.findOne({id:req.userId})
        res.send(user)
    } catch (e) {
        console.log(e.message)
        res.status(500).send('server error')
    }
})


//@rout    POST/users
//@desc    Authenticate user & get token
//@access  Public
router.post('/auth',async(req,res)=>{
    //get email,password
    const {email,password}=req.body
    try {
        //get user by unique email
        const user=await User.findOne({email})
        //check if exist
        if(!user){
            return res.status(400).send({message:'Invalid Credentials'})
        }
        //check the password
        const isValid=await bcrypt.compare(password,user.password)
        if(!isValid){
            return res.status(400).send({message:'Invalid Credentials'})
        }
        //create token
        const token=jwt.sign({id:user.id},config.jwtSecret,{expiresIn:'1 day'})
        //send the token
        res.status(200).send(token)
    } catch (e) {
        console.log(e.message)
        res.status(500).send('server error')
    }
})

module.exports=router