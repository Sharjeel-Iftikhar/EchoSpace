import Post from '../models/Posts';
import User from '../models/User';
import Like from '../models/Likes';


////////////////// New Post /////////////////////
////////////////////////////////////////////////

export const createPost = async (req, res) => {
    const { userId, description, postUrl, status, location } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newPost = new Post({
            UserID: userId,
            Description: description,
            PostUrl: postUrl,
            Comments: [],
            Status: status,
            location: location,
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

////////////////// Feed Posts and User Posts and drafted posts /////////////////////
///////////////////////////////////////////////////

export const getPosts = async (req, res) => {
    const { userId } = req.params;
    const { type } = req.query; 

    try {
        let posts;
        if (type === 'feed') {
            // Fetch all other users' public posts
            posts = await Post.find({
                $and: [
                    { UserID: { $ne: userId } },
                    { Status: "Public" },
                    { Published: true }
                ]
            });
        } else if (type === 'myposts') {
            // Fetch all my posts
            posts = await Post.find({
                $and: [
                    { UserID: userId },
                    { Published: true }
                ]
            });
        }
        else if(type === 'drafts'){
            posts = await Post.find({
                $and: [
                    { UserID: userId },
                    { Status: "Draft" },
                    { Published: false }
                ]
            }) // fetching all my drafted posts
        }
        
        else {
            return res.status(400).json({ message: 'Invalid type parameter' });
        }

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


////////////////// Delete Post /////////////////////
///////////////////////////////////////////////////

export const DeletePost = async (req, res) => {
    const { postId } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        await Post.findByIdAndDelete(postId);
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}


////////////////// Update, Like  /////////////////////
///////////////////////////////////////////////////

export const handlePostAction = async (req, res) => {
    const { postId } = req.params;
    const { action } = req.query;
    const { userId, description, status, location } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (action === 'update') {
            if (description !== undefined) post.Description = description;
            if (status !== undefined) post.Status = status;
            if (location !== undefined) post.location = location;

            const updatedPost = await post.save();
            return res.status(200).json(updatedPost);
        } else if (action === 'like') {
            const isLiked = await Like.findOne({
                $and: [
                    { UserID: userId },
                    { PostID: postId }
                ]
            });

            if (isLiked) {
                await Like.findByIdAndDelete(isLiked._id);
                return res.status(200).json({ message: "Post Unliked" });
            } else {
                const newLike = new Like({
                    UserID: userId,
                    PostID: postId,
                });
                const savedLike = await newLike.save();
                return res.status(201).json(savedLike);
            }
        } else {
            return res.status(400).json({ message: 'Invalid action parameter' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

