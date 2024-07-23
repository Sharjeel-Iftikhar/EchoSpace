import User from '../models/User.js';


///////////////////////////////// get user by ID ////////////////////////
////////////////////////////////////////////////////////////////////////
export const getUser = async( req,res ) =>{
    const {id} = req.params;
    try{
        const user = await User.findById(id);
        res.status(200).json(user);

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

///////////////////////////////// Update User ////////////////////////
////////////////////////////////////////////////////////////////////////

export const updateProfile = async( req,res ) =>{
    const {id} = req.params;
    const {Email,Name,location,Bio,ProfilePic} = req.body;
    try{
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        
        if(Email !== undefined) user.Email = Email;
        if(Name !== undefined) user.Name = Name;
        if(location !== undefined) user.location = location
        if(Bio !== undefined) user.Bio = Bio;
        if(ProfilePic !== undefined) user.ProfilePicture = ProfilePic;
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}


///////////////////////////////// Get UserFriends ////////////////////////

export const getUserFriends = async( req,res ) =>{
    const {id} = req.params;
    try{
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )

        const formatedFrnds = friends.map(({
            _id,
            Username,
            Name,
            ProfilePicture,
            location,
            Bio
        }) => ({_id,Username,Name,ProfilePicture,location,Bio}))
        res.status(200).json(formatedFrnds);
        

    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}

///////////////////////////////// Add Friend Or Remove Friend ////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export const addReomveFrnd = async (res,req) =>{
    const {id} = req.params;
    const {friendId} = req.body;
    try{
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(!user || !friend){
            return res.status(404).json({message:"User not found"});
        }
        
        const isFriend = user.friends.includes(friendId);
        if(isFriend){
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.filter((id) => id !==id);
        }
        else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formatedFrnds = friends.map(({
            _id,
            Username,
            Name,
            ProfilePicture,
            location,
            Bio
        }) => ({_id,Username,Name,ProfilePicture,location,Bio}))

        res.status(200).json(formatedFrnds);
        
        
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}