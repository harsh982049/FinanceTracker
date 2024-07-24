const User = require('../model/userModel');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
    try
    {
        const {username, email, password} = req.body;
        const checkUserName = await User.findOne({username});
        if(checkUserName)
        {
            return res.json({status: false, msg: 'Username is already used'});
        }
        const checkEmail = await User.findOne({email});
        if(checkEmail)
        {
            return res.json({status: false, msg: 'A user with this email already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, email, password: hashedPassword});
        delete user.password;
        console.log(user);
        return res.json({status: true, user});
    }
    catch(error)
    {
        next(error);
    }
};

const login = async (req, res, next) => {
    try
    {
        const {username, password} = req.body;
        const userNameCheck = await User.findOne({username});
        if(!userNameCheck)
        {
            return res.json({status: false,  msg: 'Username does not exist'});
        }
        const user = await User.findOne({username});
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword)
        {
            return res.json({status: false,  msg: 'Password is invalid'});
        }
        delete user.password;
        return res.json({status: true, user});
    }
    catch(error)
    {
        next(error);
    }
};

module.exports = {login, register};