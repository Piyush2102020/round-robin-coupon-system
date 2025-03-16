const mongoose=require('mongoose');
const coupon=require('../model/coupoun');
const ip=require('../model/ip');


const generateCouponCode = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let coupon = '';
    for (let i = 0; i < length; i++) {
        coupon += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return coupon;
};



const createCoupons=async (req,res)=>{
    
    try{
        for(let i=0;i<req.query.number;i++){
            const code=await generateCouponCode();
            console.log("Code : ",code);
            
            const newCoupon=new coupon({code:code,creatorAdmin:req.query.id});
            newCoupon.save();
        }
        res.status(200).json({response:"Coupons Successfully created"});
    }

    catch(e){
        res.status(500).json({response:"Internal Server Error"});
    }
    
}


const COOLDOWN_TIME = parseInt(process.env.COOLDOWN_TIME) || 10000; 

const getCoupon = async (req, res) => {
    try {
        const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const hasClaimed = await ip.findOne({ ip: userIp });

        if (hasClaimed && hasClaimed.lastClaimedAt) {
            const timeElapsed = Date.now() - hasClaimed.lastClaimedAt;

            if (timeElapsed < COOLDOWN_TIME) {
                return res.status(429).json({ 
                    response: "Too many requests. Try again later",
                });
            }
        }

        const unassignedCoupon = await coupon.findOne({ status: 0 });

        if (!unassignedCoupon) {
            return res.status(404).json({ response: "No available coupons" });
        }

        const updated = await coupon.findOneAndUpdate(
            { _id: unassignedCoupon._id },
            { $set: { status: 1, assignedIp: userIp } },
            { new: true }
        );

        await ip.findOneAndUpdate(
            { ip: userIp },
            { lastClaimedAt: Date.now() },
            { upsert: true }
        );

        return res.status(200).json({ response: updated.code });

    } catch (e) {
        console.error("Error:", e);
        return res.status(500).json({ response: "Internal Server Error" });
    }
};



const getAllCoupons= async (req,res)=>{
    const coupons=await coupon.find();

    if(coupons){
        res.status(200).json({response:coupons});
    }

    else{
        res.status(500).json({response:"Some unknown error occurred"});
    }
}

module.exports={createCoupons,getCoupon,getAllCoupons};