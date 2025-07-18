import express from 'express'
const app = express()
import  mongoose from 'mongoose'
const port = process.env.PORT || 3000;
import cors from 'cors'
import  axios from 'axios'
import  encrypt from 'mongoose-encryption'
import { use } from 'react';

import dotenv from 'dotenv';
dotenv.config();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

//Schema for database
const tryschema = new mongoose.Schema({
    name:String,
    Sessionss: [
    {
      id: Number,
      project: String,
      duration: String,
      timestamp: String
    }
  ],
    pass:String,
    email:String
})

//Encryption
const secret = "thisislittlesecret"
tryschema.plugin(encrypt,{secret:secret,
    encryptedFields:["pass"]
})


const user = mongoose.model('User',tryschema)



//Post Request for SignUp
app.post('/SignUp',async(req,res)=>{
    const {name1,email1,Password1} = req.body
    const use = await user.findOne({email:email1.toLowerCase().trim()});
    if(!use){
        try{
            const p = new user({name:name1,
                pass:Password1,
                email:email1.toLowerCase().trim()
            })
        
            await p.save()

            res.status(200).json({message:'Signup Successful'})
        }catch(error){
           
            res.status(500).json({message:'SignUp not successful'})
        }
    }else{
        res.status(401).json({message:'User Already Exist'})
    }
})


//Post Request for Signin
app.post('/SignIn',async(req,res)=>{
    const {emailS,passwordS}=req.body
    const use = await user.findOne({email:emailS.toLowerCase().trim()});
    if(!use){
        res.status(404).json({message:'User not found'})

        
    }else if(passwordS!=use.pass){
        res.status(401).json({message:'Incorrect Password'})
    }else{
        
        res.status(200).json({message:use.name})
    } 
})



//Post for sessionLogUpdation
app.post('/SessionUpdate',async(req,res)=>{
    const {emailSe,Sessions} = req.body
    const use = await user.findOne({email:emailSe.toLowerCase().trim()});
    use.Sessionss=Sessions
    await use.save()
    
    res.status(200).json({message:'Success'})


    

})


//getSession from server
app.post('/GetSessions',async(req,res)=>{
    try{
            const {emailG} = req.body
            const use = await user.findOne({email:emailG.trim().toLowerCase()})
            
            res.status(200).json({Sessions:use.Sessionss})
            

    }catch (error){
        console.log(error)
    }
   
})





//Listening the port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})