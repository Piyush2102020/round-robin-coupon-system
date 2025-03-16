import axios from "axios";
import { useEffect, useState } from "react"
import Coupon from "../components/coupon";





export default function Dashboard(){
    const [selectedNumber,setSelectedNumber]=useState("0");
    const [data,setData]=useState([]);
    const endpoint=import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
    const createCoupons=()=>{
        if(selectedNumber=="0"){
            return alert('Please select a number');
        }
        const adminId=localStorage.getItem('token');
        
        axios.get(`${endpoint}/createcoupons?id=${adminId}&number=${selectedNumber}`)
        .then((response)=>{
            if(response.status==200){
                alert(response.data.response);
                window.location.reload();
            }
        }).catch((e)=>{
            alert('Error '+e.response.status+" "+e.response.data.response);
        });
    }
    

    const getAllCoupons=()=>{
        axios.get(`${endpoint}/all`).then((response)=>{
            setData(response.data.response);
        }).catch((e)=>{
            alert(`Error ${e.response.status} ${e.response.data.response}`);
        })
    }

    useEffect(()=>{
        getAllCoupons();
    },[])
    return(<>
    <div className="admin">
    <select value={selectedNumber} onChange={(e) => setSelectedNumber(e.target.value)}>
                {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                        {num + 1}
                    </option>
                ))}
            </select>
        <button onClick={createCoupons}>create Coupons</button>


        {
            data.map((value,index)=><Coupon coupon={value}/>)
        }
    </div>
    </>)
}