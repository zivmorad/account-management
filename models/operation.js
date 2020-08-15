const mongoose=require('mongoose')

//create operation schema
const operationSchema=new mongoose.Schema({
    userId:{
        type:String,  
        ref:'users'
    },
    typeOfOperation:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    amount:{
        type:String,
        required:true,
        trim:true,
    },
    date:{
        type:String,
        required:true,
    }
})

//create operation model
const Operation=mongoose.model('operation',operationSchema)

module.exports=Operation