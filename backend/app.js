import express from 'express'
import Connection from './database/db.js'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import postRouter from './routes/post.js';
import bodyParser from 'body-parser'


dotenv.config()
const app = express()
const port = process.env.DB_PORT



app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const start = async () =>{
    try{
        Connection();
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`)
        })
    }
    catch(error){
        console.log(error)
    }
}

// Routes

app.use('/api/auth/',authRouter);
app.use('/api/post/',postRouter);

start();

