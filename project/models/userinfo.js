const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type: String,
        unique: true,
        required: true,
    
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
})

const USER=mongoose.model("user",userSchema)

module.exports=USER