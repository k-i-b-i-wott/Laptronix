import jwt from 'jsonwebtoken'
import * as userRepositories from '../repository/user.repository'
import { newUser, updateUser } from '../types/user.types'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { sendMail } from '../mailer/mailer'
import { emailTemplate } from '../mailer/mailTemplate'

dotenv.config()

export const fetchAllUsers = async ()=>{
    const results = await userRepositories.getAllUsers()
    return results
}

export const getUserByEmail = async (emailAddress:string)=>{
    const user = await userRepositories.getUserByEmail(emailAddress)
    return user;

}


export const createUser = async(user:newUser)=>{
   const existingUser =await userRepositories.getUserByEmail(user.emailAddress);
   if(existingUser){
    throw new Error('User already exist')
   }
   if(user.passwordHash){
    const password = await bcrypt.hash(user.passwordHash,10) ;
    user.passwordHash =password          
   }

   const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
   user.verificationCode = verificationCode;
   
   const result = await userRepositories.createUser(user)
   await userRepositories.setVerificationCode(user.emailAddress,verificationCode);
   try {
    await  sendMail(
        user.emailAddress,
        'Verify your Email Address',
        emailTemplate.verifyEmail(user.verificationCode)
    )
   } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
   }

   return result

}

export const verifyEmail = async(emailAddress:string, code:string)=>{
    const user = await userRepositories.getUserByEmail(emailAddress);
    if(!user) throw new Error ('User not found')
    if(user.verificationCode !== code) throw new Error ('Invalid verification code')
    const result = await userRepositories.verifyUserEmail(emailAddress)
    try {
        await  sendMail(
            user.emailAddress,
            "Verification Successful",
            emailTemplate.welcome(user.firstName)
        )
       } catch (error) {
        console.error('Error sending welcome email:', error);
        return false;
       }
    return result
}

export const loginUser = async(emailAddress:string, passwordHash:string)=>{
    const user = await userRepositories.getUserByEmail(emailAddress);
    if(!user) throw new Error('User not found')
    const isMatch = await bcrypt.compare(passwordHash,user.passwordHash)    
    if(!isMatch)throw new Error('Invalid credentials')

    const payload={
        sub:user.id,
        FN:user.firstName,
        LN:user.lastName,
        role:user.userRole,
        exp:Math.floor(Date.now()/1000 +(60*60) )} 

    const secret = process.env.JWT_SECRET as string

    if(!secret)throw new Error('JWT secret not defined')
     const token = jwt.sign(payload,secret)
    return{
        message:"Login Successful",
        token,
        user:   {
            id: user.id,
            firstName: user.firstName,
            lastName:user.lastName,
            userName:user.userName,
            phoneNumber:user.phoneNumber,
            emailAddress:user.emailAddress,
            userRole:user.userRole,
            profileImage:user.profileIMage
        }
       
    }
}

export const getUserById = async(id:number)=>{

    if( isNaN(id)){
         throw new Error('Id Should be a number')
    }

        const user = await userRepositories.getUserById(id)
     if(!user){
        throw new Error ('User not found')
     }
        
     return user;    
}

export const deleteUser= async (id:number)=>{

     if( isNaN(id))throw new Error('Id Should be a number')
        
    const user = await userRepositories.getUserById(id)
    if(!user)throw new Error('User not found')
    const results = await userRepositories.deleteUser(id)  

    return results;
}

export const updateUserDetails = async(id:number, userData:Partial<updateUser>)=>{
    const existingUser = await userRepositories.getUserById(id)
    if(!existingUser){
        throw new Error ('User not found')
    }
    const updatedUserData = {...existingUser,...userData}
    const result = await userRepositories.updateUserProfile(updatedUserData)
    return result;
}
