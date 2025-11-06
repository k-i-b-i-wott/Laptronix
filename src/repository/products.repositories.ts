import { getPool } from "../db/config";



export const getAllProducts = async ()=>{
    const pool = await getPool();
    const results = await pool.request().query("SELECT * FROM Products")
    return results.recordset
}