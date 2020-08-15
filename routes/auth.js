const express=require('express')
const auth = require('../middleware/auth')
const router=new express.Router()
const User=require('../models/User')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const config=require('../config/default.json');
const { check,validationResult } = require('express-validator');

//@rout    GET/auth
//@desc    get user by token 
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
router.post('/auth',[
    check('email','Please enter a valid email').isEmail(),
    check('password','Password is required').not().isEmpty()
],async(req,res)=>{
    //check if there are errors
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({errors:errors.array()})
    }
    //get email,password
    const {email,password}=req.body
    try {
        //get user by unique email
            let user=await User.findOne({email})
        //check if exist
        if(!user){
            console.log('Invalid Credentials')
            return res.status(400).send({errors:[{msg:'Invalid Credentials'}]} )
        }
        //check the password
        const isValid=await bcrypt.compare(password,user.password)
        if(!isValid){
            console.log('Invalid Credentials')
            return res.status(400).send({errors:{msg:'Invalid Credentials'}})
        }
        //create token
        const token=jwt.sign({id:user.id},config.jwtSecret,{expiresIn:'1 day'})
        //send the token
        res.status(200).send({token})
    } catch (e) {
        console.log(e.message)
        res.status(500).send('server error')
    }
})

//@rout    PUT/users
//@desc    update user 
//@access  Public
router.patch('/auth',auth,async(req,res)=>{
    try {
        const user=await User.findOne({id:req.userId})
        if(!user){
            return res.status(404).send({msg:'error'})
        }
        //get the updates key
        const updates=Object.keys(req.body)
        //loop for each update and change it on the user
        updates.forEach(item=>{user[item]=req.body[item]})
        //store the change in the db
        await user.save()
        res.status(200).send(user)
    } catch (e) {
        console.log(e.message)
        res.status(500).send('server error')
    }
})

module.exports=router