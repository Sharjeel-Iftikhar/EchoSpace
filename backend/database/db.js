import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const Connection = () =>{
    const MONG_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jklrsmv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    mongoose.connect(MONG_URL);

    mongoose.connection.on('connected', () => {
        console.log("Connection Established with MongoDB");
    })

    mongoose.connection.on("disconneted", () => {
        console.log("Connection Disconneted with MongoDB");

    })

    mongoose.connection.on('error', (err) => {
        console.log("Connection Failed with MongoDB");
    })
}

export default Connection;


