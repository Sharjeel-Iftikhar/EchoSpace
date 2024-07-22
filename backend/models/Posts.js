import mongoose from "mongoose";

import Comment from '../models/Comments.js';

const PostSchema = new mongoose.Schema({
    UserID : {
        type : Schema.Types.ObjectId, ref: 'User',
        required : true
    },
    Description : {
        type : String,
        max : 1000,
        required: true,
    },
    PostUrl : {
        type : String,
        default : "",
    },
    Comments : [Comment],
    Status :{
        type : String,
        enum : ["Public", "Private","Draft"],
        default : "Public"
    },
    published :{
        type: Boolean,
        default:true,
    },
    location :{
        type: String,
        default: "",
    }
},
{timestamps : true}

);

const Post = mongoose.model("Post", PostSchema);
export default Post;