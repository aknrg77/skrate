const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const {userRoleValidator} = require('../helpers/enumValidator');

const validateBody = (req,res,next) =>{
    if(req.body.role!= undefined && !userRoleValidator(req.body.role)){
        return res.status(500).json({ Message: "Invalid role" });
    }

    if(req.body.email && req.body.password){
        return next();
    }

    return res.status(400).json({"Messege":"Email or Password is not there!!!"})
}


const setUser = async (req,res,next) =>{
    let token = req.headers.authorization;

    if(token){
        token = token.replace('Bearer ','');
        let user = jwt.verify(token, process.env.SECRET_KEY);
        try{
            let userFind = await User.findOne({uid:user.uid});
                if(userFind){
                    req.user = userFind;
                }else{
                    return res.status(401).json({"Messege":"Unauthorized!!!"});
                }
        }catch(error){
            return res.status(500).json({"Messege" : error.message});
        }
    }else{
        return res.status(400).json({"Messege":"Token missing!!!"});
    }
    return next();
}


module.exports = {
    validateBody,
    setUser
};