import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom";

export default function User(){


    const [code,setCode]=useState('');
    const endpoint=import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'
    function getCode(){
    axios.get(`${endpoint}/getcoupon`).then((response)=>{
        if(response.status==200){
            setCode("Your code is : "+response.data.response);
        }
    }).catch((e)=>{
        setCode(`Error occured ${e.response.status} ${e.response.data.response}`);
    })
    }

    return(
        <div className="user">
            <h1>{code}</h1>

            <button onClick={()=>getCode()}>Get Code</button>
            <Link to={'/createaccount'}><button >Create Admin account</button></Link>
        </div>
    )
}