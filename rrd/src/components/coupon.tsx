

interface ICoupon{

    coupon: {
        code: string;
        createdAt?: Date;
        status?: number; // 0 for not claimed, 1 for claimed
        assignedIp?: string | null;
        creatorAdmin: string;
    }

}
export default function Coupon({coupon}:ICoupon){
    return(
        <div className="coupon">
            Coupon Code : {coupon.code}<br/>
            Created At : {coupon.createdAt?.toString()}<br/>
            Status : {coupon.status==1?"Assigned":"Not Assigned Yet"}<br/>
            Assigned To : {coupon.assignedIp!=null?coupon.assignedIp:"Ip not available"}<br/>
            Creator Admin Id : {coupon.creatorAdmin}<br/>
        </div>
    )
}