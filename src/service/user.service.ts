import * as userRepositories from '../repository/user.repository'
import { newUser } from '../types/user.types'
import bcrypt from 'bcrypt'

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
   
   const result = await userRepositories.createUser(user)

   return result

}
