import { error } from "console";
import { getPool } from "../db/config";
import { newUser } from "../types/user.types";


export const getAllUsers = async ()=>{
    const pool = await getPool();
    const results = await pool.request().query("SELECT * FROM Users")
    
    return results.recordset
}


export const getUserByEmail =async(emailAddress:string)=>{
    const pool = await getPool();
    const results=await pool.request().input("emailAddress",emailAddress).query("SELECT * FROM Users WHERE emailAddress =@emailAddress");    
    return results.recordset[0];
}



export const createUser = async (user:newUser)=>{
    const pool = await getPool()
    await pool.request()
    .input("firstName",user.firstName)
    .input("lastName",user.lastName)
    .input("userName",user.userName)
    .input("emailAddress",user.emailAddress)
    .input("phoneNumber",user.phoneNumber)
    .input("passwordHash",user.passwordHash)
    .input("userRole",user.userRole)
    .query("INSERT INTO Users(firstName,lastName,userName,emailAddress,phoneNumber,passwordHash,userRole)Values(@firstName,@lastName,@userName,@emailAddress,@phoneNumber,@passwordHash,@userRole) ");
    return {message:"User creates successfully"}
}