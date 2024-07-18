import pkg from 'pg'
const { Pool,Client } = pkg
import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

const runDatabase = async () =>{
    const client = await pool.connect()
    try{
        const {rows} = await client.query('SELECT current_user');
        const current_user = rows[0]['current_user'];
        console.log("Connected with the postgres Sql successfully having user",current_user);
    }
    catch(error){
        console.log(error)
    }
    finally{
        client.release()
    }
}

export default runDatabase
