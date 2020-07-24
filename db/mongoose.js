const mongoose=require('mongoose')


//set up connection from mongoose to the mongoDB

mongoose.connect('mongodb://127.0.0.1:27017/easy-bank-api',{
    useNewUrlParser:true,
    useCreateIndex:true
})
