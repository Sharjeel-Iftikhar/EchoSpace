import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    UserID : {
        type : String,
        required : true
    },
    Description : {
        type : String,
        required : true
    },
    Likes : {
        type : Array,
        default : []
    },
    
},
{timestamps : true}
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
