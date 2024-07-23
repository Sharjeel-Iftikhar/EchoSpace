import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Username :{
        type : String,
        required : true,
        unique : true
    },
    Email :{
        type : String,
        required : true,
        unique : true
    },
    Password :{
        type : String,
        required : true
    },
    Name :{
        type : String,
        required : true
    },
    ProfilePicture :{
        type : String,
        default : ""
    },
    Bio :{
        type : String,
        default : ""
    },
    friends :{
        type: Array,
        default : []
    },
    location : {
        type : String,
        default : ""
    }
    
},
{timestamps:true}

);


const User = mongoose.model("User", UserSchema);
export default User;