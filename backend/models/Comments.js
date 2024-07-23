import mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema({
    UserID : {
        type : String,
        required : true
    },
    Description : {
        type : String,
        required : true
    },
    Likes : {
        type : Map,
        of: Boolean,
    },
    
},
{timestamps : true}
);

export const Comment = mongoose.model("Comment", CommentSchema);
