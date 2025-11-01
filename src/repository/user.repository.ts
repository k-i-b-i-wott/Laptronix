import { error } from "console";
import { getPool } from "../db/config";


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



export const createUser = async ()=>{
    const pool = await getPool()
    await pool.request()
    .input("",error)
    .query("")

    return {message:"User creates successfully"}
}