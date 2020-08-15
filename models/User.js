const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

//create the user schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    id:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    bankName:{
        type:String,
        required:true,
        trim:true
    },
    bankAccount:{
        type:String,
        required:true,
        trim:true
    },
    totalMoney:{
        type:String,
        required:true,
        trim:true
    },
    monthlyLimit:{
        type:String,
        required:true,
        trim:true
    },
    avatar:{
        type:String,
    },
})

//hash the password before save to db
userSchema.pre('save',async function(next){
    //turn userSchema into user
    const user=this
    //check if password modified and hash the password
    if(user.isModified('password')){
        //bcrypt hash the password 
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})


//create the model User
const User=mongoose.model('user',userSchema)
module.exports=User