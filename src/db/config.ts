import sql from "mssql"
import assert from 'assert'
import dotenv from "dotenv"

dotenv.config()

const {
PORT,
SQL_USER,
SQL_PWD,
SQL_DB,
SERVER_NAME
}=process.env

assert(PORT,"Port number required")
assert(SQL_USER,"SQL User required")
assert(SQL_PWD,"SQL password required")
assert(SQL_DB,"Provide the database")
assert(SERVER_NAME,"Provide the server name")




export const config ={
    port:PORT,
    sqlConfig:{
        user:SQL_USER,
        server:SERVER_NAME,
        password:SQL_PWD,
        database:SQL_DB,

        pool:{
            max:10,
            min:0,
             idleTimeoutMillis:30000,
        },
        options:{
            encrypt:true,
            trustServerCertificate:true
        }
    }
}


export const getPoll =async ()=>{
    
   try {
     const pool = await sql.connect(
        config.sqlConfig
    )
    return pool
    
   } catch (error) {
    console.log("SQL SERVER ERROR",error)    
    throw error
   }
}
    