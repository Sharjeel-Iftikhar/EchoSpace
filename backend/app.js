import express from 'express'
import runDatabase from './database/db.js'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'


dotenv.config()
const app = express()
const port = 3000;

app.use('/api/auth/',authRouter);

const start = async () =>{
    try{
        await runDatabase();
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start();

