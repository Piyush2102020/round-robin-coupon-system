const mongoose=require('mongoose');
let couponSchema={
    code:{type:String,required:true,unique:true},
    createdAt:{type:Date,default:Date.now},
    status:{type:Number,unique:false,default:0}, //0 for not claimed 1 for claimed
    assignedIp:{type:String,default:null},   
    creatorAdmin:{type:String,required:true}
}


const coupon=mongoose.model('Coupoun',new mongoose.Schema(couponSchema));

module.exports =coupon;