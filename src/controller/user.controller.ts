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


export const createUser = async (req:Request, res:Response)=>{
    const user = req.body
    try {
        
        const userData = await userServices.createUser(user)

        res.status(201).json(userData)
        
    } catch (error:any) {
        if(error.message === 'User already exist'){
            res.status(409).json({error:error.message})        }
        
        res.status(500).json({error:'Internal server error', errorMessage:error.message} )
    }
}

export const verifyEmail = async(req:Request,res:Response)=>{
    const {emailAddress,code} = req.body;
    try {
        if(!emailAddress || !code){
            return res.status(400).json({error:"Email address and code are required"})
        }
        const result = await userServices.verifyEmail(emailAddress,code)
        res.status(200).json(result)
        
    } catch (error:any) {
        if(error.message === 'User not found'){
            res.status(404).json({error:error.message})
        }else if(error.message === 'Invalid verification code'){
            res.status(401).json({error:error.message})
        }
        res.status(500).json({error:"Internal server error", errorMessage:error.message} )
    }
}

export const loginUser = async(req:Request,res:Response)=>{
    const {emailAddress,passwordHash}=req.body

   try {
    
     const user = await userServices.loginUser(emailAddress,passwordHash)
    
    res.status(200).json(user)
    
   } catch (error:any) {
    if(error.message === 'User not found') {
        res.status(4040).json({error: error.message})        
    } else if(error.message === 'Invalid credentials')  {
        res.status(401).json({error: error.message})
    }
    res.status(500).json({error:"Internal server error", errorMessage:error.message} )
   }
}

export const getUserById = async(req:Request,res:Response)=>{
    const id = parseInt(req.params.id)
    try {
        const user = await userServices.getUserById(id)
        res.status(200).json(user)        
    } catch (error:any) {
        if(error.message === 'Id Should be a number' || error.message === 'User not found'){
            res.status(404).json({error:error.message})
        }
        res.status(500).json({error:"Internal server error"})        
    }


}

export const updateUser = async(req:Request,res:Response)=>{
    const id = parseInt(req.params.id);
    const userData= req.body;
    try {
        const result = await userServices.updateUserDetails(id,userData)
        res.status(200).json(result)        
    } catch (error:any) {
        if(error.message === 'User not found'){
            res.status(404).json({error:error.message})
        }
        res.status(500).json({error: "Internal server error"})        
    }
}    

export const deleteUser = async(req:Request,res:Response)=>{
    const id = parseInt(req.params.id);
    try {
        
        const results = await userServices.deleteUser(id)
        res.status(200).json(results)        
    } catch (error:any) {
        if(error.message === 'Id Should be a number' || error.message === 'User not found'){
            res.status(404).json({error:error.message})
        }
        res.status(500).json({error: "Internal server error"})
    }
}
