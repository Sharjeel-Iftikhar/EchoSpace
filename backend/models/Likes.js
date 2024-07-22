import mongoose from "mongoose";
import Schema from "mongoose";

const LikeSchema = new mongoose.Schema({
    UserID : {
        type : Schema.Types.ObjectId, ref: 'User',
        required : true
    },
    PostID : {
        type : Schema.Types.ObjectId, ref: 'Post',
    },
    CommentID : {
        type : Schema.Types.ObjectId, ref: 'Comment',
    },


},
{timestamps : true}

);

const Like = mongoose.model("Like", LikeSchema);
export default Like;