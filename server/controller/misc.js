const bcrypt=require('bcrypt');
const mongoose=require('mongoose');


const hashPassword=(password)=>{
    return bcrypt.hash(password,10);
}


const checkPassword=(password,hashPassword)=>{
    return bcrypt.compare(password,hashPassword);
}
const connectDb=()=>{
    try{
        mongoose.connect(process.env.DB_URL);
        return true;
    }
        catch(e){
            console.log("Error Connecting Database :",e);
            return false;
            
        }
}
module.exports={hashPassword,connectDb,checkPassword}