import * as userServices from '../service/user.service'

import { Request,Response}from 'express'


export const getAllusers =async (req:Request,res:Response)=>{
   try {

     const users = await userServices.fetchAllUsers()

    res.status(200).json({message:"Users fetched successfully",users})
    
   } catch (error) {
    res.status(500).json({message:"Server error"})    
   }
}

export const getUserByEmail = async(req:Request,res:Response)=>{
    const emailAddress= req.params.emailAddress

    try {

        if(!emailAddress){
            return res.status(404).json("Email address required")
        }

        const user = await userServices.getUserByEmail(emailAddress);       

        res.status(200).json({ message:"User details fetched successfully",user})
        
    } catch (error:any) {
        if(error.message === "Unauthorized"){
            res.status(401).json({message:"Unauthorized"})

        }
        res.status(500).json({ message: "Server Error",error });

    }
}


