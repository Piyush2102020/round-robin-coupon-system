const mongoose=require('mongoose');


const adminSchema={
    name:{type:String,required:true},
    phone:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true,lowercase:true},
    password:{type:String,required:true},//Hashed password using bcrypt
    authority:{type:Number,default:0},//0 for admin 1 for user
    createdAt:{type:Date,default:Date.now}
}


const admin=mongoose.model('Admin',new mongoose.Schema(adminSchema));
module.exports=admin;