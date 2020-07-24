const mongoose=require('mongoose')



const operationSchema=new mongoose.Schema({
    user:{/////////////try later to user user.id//////////////
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    type:{
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
        validate(value){
            if(value<0){
                return new Error('amount must be above 0')
            }
        }
    },
    date:{
        type:Date,
        default:Date.now
    }
})


const Operation=mongoose.model('operation',operationSchema)

module.exports=Operation