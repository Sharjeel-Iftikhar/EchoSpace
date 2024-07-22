import Post from '../models/Posts';
import User from '../models/User';


////////////////// New Post /////////////////////
////////////////////////////////////////////////

export const createPost = async (req,res) =>{
    const {userId,description,postUrl,status,location} = req.body;

    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const newPost = new post({
            UserID : userId,
            Description : description,
            PostUrl : postUrl,
            Comments: [],
            Status : status,
            location : location,
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

////////////////// Feed Posts /////////////////////
///////////////////////////////////////////////////

export const FeedPost = async (req,res) =>{
    const {userId} = req.body;
    try{
        const posts = await Post.find({
            $and : [
                { UserID: { $ne: userId } },
                { Status: "Public" },
                {Published : true}
            ]}) // fetching all other user's publc posts
             
        res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


////////////////// My Posts /////////////////////
////////////////////////////////////////////////

export const MyPosts = async (req,res) =>{
    const {userId} = req.body;
    try{
        const posts = await Post.find({
            $and : [
                { UserID: userId },
                {Published : true}
            ]}) // fetching all my posts


        res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


////////////////// Drafted Posts /////////////////////
/////////////////////////////////////////////////////

export const DraftedPosts = async (req,res) =>{
    const {userId} = req.body;
    try{
        const posts = await Post.find({
            $and : [
                { UserID: userId },
                { Status: "Draft" },
                {Published : false}
            ]}) // fetching all my drafted posts

        res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


////////////////// Delete Post /////////////////////
///////////////////////////////////////////////////

export const DeletePost = async (req,res) =>{
    const {postId} = req.body;
    try{
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not found"});
        }
        await Post.findByIdAndDelete(postId);
        res.status(200).json({message:"Post deleted successfully"});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


////////////////// Update Post /////////////////////
///////////////////////////////////////////////////

export const UpdatePost = async (req,res) =>{
    const { postId, description, status, location } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        post.Description = description;
        post.Status = status;
        post.location = location;
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}