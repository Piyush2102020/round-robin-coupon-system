const express=require('express');
const mongoose=require('mongoose');
const {connectDb}=require('./controller/misc')
const routes=require('./routes/routes');
const cors=require('cors');
require('dotenv').config()

const app=express();

app.use(express.json());
app.use(cors());
app.use(routes);


const startServer=async ()=>{
    const isConnected=await connectDb();
    if(isConnected){

        console.log("Database Connected Starting Server at port : ",process.env.PORT);
        app.listen(process.env.PORT,()=>{
            console.log("Server Started");
            
        })
        

    }else{
        console.log("Error starting Server");
        process.exit(1);
    }
    
}


startServer();