import dotenv from 'dotenv'

import { Request,Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


dotenv.config()


const checkRoles = (requiredRoles:"admin"|"user"|"both")=>{
    return (req:Request,res:Response,next:NextFunction):void=>{
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            res.status(401).json({message:"Unauthorized"})
            return;
        }

        const token = authHeader.split('')[1];//the second part of the token

        try {
           const decoded =jwt.verify(token , process.env.JWT_SECRET as string)

           if( typeof decoded ==='object' && decoded !==null && 'userRole' in decoded){
            if(requiredRoles === 'both'){
                if(decoded.userRole === "admin" || decoded.userRole=== "user"){
                    next()
                    return
                }else if(decoded.userRole === requiredRoles){
                    next()
                    return;
                }

                res.status(401).json({message:"Unauthorized"})
                return

                    
                
            }else{
                 res.status(401).json({ message: "Invalid Token Payload" });
                return;
            }
           }

           res.status(401).json({ message: "Invalid Token Payload" });
            return;
                       
        } catch (error) {
            res.status(401).json({message:"Invalid token"})
            return            
        }
    }
}

export const adminOnly = checkRoles("admin")
export const userOnly = checkRoles("user")
export const adminAndUser = checkRoles("both")
