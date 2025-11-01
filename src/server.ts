import dotenv from "dotenv"
import { getPoll } from "./db/config"
import app from "./index"
import { error } from "console"
dotenv.config()






const port = process.env.PORT 


app.listen(port,()=>{
    console.log(`Server running on PORT:${port}`)
})



getPoll()
.then(()=>{console.log("Database connected successfully")})
.catch((error:any)=>{console.log("Database connection failed",error)})
