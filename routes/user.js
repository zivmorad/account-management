const express=require('express')
const router=new express.Router()
const User=require('../models/User')
const gravatar=require('gravatar')
const jwt=require('jsonwebtoken')
const auth=require('../middleware/auth')
const config=require('../config/default.json')
const {check,validationResult} =require('express-validator')

//@rout    POST/users
//@desc    Register user
//@access  Public
router.post('/users',[
    //check validation
    check('firstName','First Name is required').not().isEmpty(),
    check('lastName','Last Name is required').not().isEmpty(),
    check('id','Please enter id with 9 numbers').isLength({min:9}),
    check('email','Please provide valid email').isEmail(),
    check('password','Please enter password with 5 or more characters').isLength({min:5}),
    check('bankName','Bank Name is required').not().isEmpty(),
    check('bankAccount','Bank account is required').not().isEmpty(),
    check('totalMoney','Please provide how much money you got').not().isEmpty(),
    check('monthlyLimit','Monthly limit is required and positive number').isInt({gt:0})
],async(req,res)=>{
    //check if there is errors
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({errors:errors.array()})
    }
    const {firstName,lastName,id,email,password,bankName,bankAccount,totalMoney,monthlyLimit}=req.body
    try {
        //check if user exist by email
        let user=await User.findOne({email})
        if(user){
            return res.status(400).send({errors:[{msg:'Email already exist'}]})
        }
        //create the new user
        user=new User({
            firstName,
            lastName,
            id,
            email,
            password,
            bankName,
            bankAccount,
            totalMoney,
            monthlyLimit
        })
        //create token
        const token=jwt.sign({id:user.id},config.jwtSecret,{expiresIn:'1 day'})
        //create pic with gravatar-email url
        const avatar =gravatar.url(user.email,{
            s:'200', //size of the pic
            r:'pg',
            d:'mm' //defult img
        })
        user.avatar=avatar
        //store the user in db
        await user.save()
        res.status(201).send({ token })
    } catch (e) {
        console.log(e.message)
        res.status(500).send('server error')
    }
})

router.delete('/users',auth,async(req,res)=>{
    //get user and delete from db
    const user=await User.deleteOne({id:req.userId})
    res.status(200).send(user)
})


module.exports=router