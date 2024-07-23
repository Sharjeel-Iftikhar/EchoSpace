import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';


export const register =  async (req,res) =>{
    try{
        const {
            Username,
            Email,
            Password,
            Name,
            location,
        } = req.body;
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(Password,salt);
        const newUser = new User({
            Username,
            Email,
            Password: hashedPassword,
            Name,
            location,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


export const login =async (req,res) =>{
    try{
        const {Email,Password} = req.body;
       
        const user = await User.findOne({Email:Email});
        if(!user){
            res.status(400).json({message:
                "User not found"
            });
        }
        const isMatch = await bcrypt.compare(Password,user.Password);
        if(!isMatch) res.status(400).json({message:"Invalid Credentials"});
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.Password;
        res.status(200).json({user,token});

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


