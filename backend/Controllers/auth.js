// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';


export const register =  (req,res,next) =>{
    res.json({
        status: 'Success',
        message: 'SignUp route is working'
    });
}


export const login = (req,res,next) =>{
    res.json({
        status: 'Success',
        message: 'Login route is working'
    });
}


