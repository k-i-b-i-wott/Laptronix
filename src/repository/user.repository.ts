import { error } from "console";
import { getPool } from "../db/config";
import { newUser, updateUser } from "../types/user.types";


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

export const setVerificationCode = async(emailAddress:string, code:string)=>{
    const pool = await getPool()
    await pool.request()
    .input("emailAddress",emailAddress)
    .input("verificationCode",code)
    .query("UPDATE Users SET verificationCode=@verificationCode WHERE emailAddress=@emailAddress");    
}
export const verifyUserEmail = async(emailAddress:string)=>{
    const pool = await getPool()
    const result = await pool.request()
    .input("emailAddress",emailAddress)    
    .query("UPDATE Users SET verificationCode=NULL, isVerified=1 WHERE emailAddress=@emailAddress");
    return {message:"Email verified successfully"};
}

export const loginUser = async(emailAddress:string, passwordHash:string)=>{
    const pool = await getPool()
    const userData = await pool
    .request()
    .input("emailAddress",emailAddress)
    .input("passwordHash",passwordHash)
    .query("SELECT FROM Users WHERE emailAddress = @emailAddress AND passwordHash = @passwordHash")

    return userData.recordset[0];
}

export const getUserById= async (id:number)=>{
    const pool = await getPool()
    const user =await  pool
    .request()
    .input("id",id)
    .query("SELECT * FROM Users WHERE id = @id");
    return user.recordset[0]||null
    
}

export const updateUserProfile =async (userData:updateUser)=>{
    const pool = await getPool()
    const result = await pool
    .request()
    .input("firstName",userData.firstName)
    .input("lastName",userData.lastName)
    .input("userName",userData.userName)
    .input("emailAddress",userData.emailAddress)
    .input("phoneNumber",userData.phoneNumber)
    .input("profileImage",userData.profileImage)
    .query('UPDATE Users SET firstName=@firstName, lastName=@lastName, userName=@userName, emailAddress=@emailAddress, phoneNumber=@phoneNumber, profileImage=@profileImage WHERE emailAddress=@emailAddress')
    return result;
}



export const deleteUser = async(id:number)=>{
    const pool = await getPool()
    await pool
    .request()
    .input("id",id)
    .query("DELETE FROM Users WHERE id=@id")
    return{message:"User deleted successfully"}
}


