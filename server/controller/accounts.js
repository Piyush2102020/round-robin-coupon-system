const {hashPassword,checkPassword}=require('./misc');
const admin=require('../model/user');

const createAccount=async (req,res)=>{
    const data=req.body;
    const existingAdmin = await admin.findOne({
        $or: [{ email: data.email }, { phone: data.phone }]
    });
    if(existingAdmin){
        return res.status(400).json({response:"Email or phone already in use"});
    }

    try{
        data.password=await hashPassword(data.password);
        const newAdmin=new admin(data);
        const saved=await newAdmin.save();
        res.status(200).json({response:"User Successfully Registered"});
    }
    catch(e){
        console.log(e);
        
        res.status(500).json({response:"Internal Server Error"});
    }
}

const handleLogin = async (req, res) => {
    try {
        const data = req.body;

        const isUser = await admin.findOne({ email: data.email });

        if (!isUser) {
            return res.status(404).json({ response: "No User Found" }); 
        }

        const isCorrect = await checkPassword(data.password, isUser.password);

        if (!isCorrect) {
            return res.status(401).json({ response: "Password incorrect" }); 
        }

        const userId=await isUser._id.toJSON().toString() ;
        return res.status(200).json({ response: "Login Success", data:userId });


    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ response: "Internal Server Error" });
    }
};

module.exports={createAccount,handleLogin};