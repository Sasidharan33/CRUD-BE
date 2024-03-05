const loginrouter = require('express').Router()
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config/config')

loginrouter.post('/',async(req,res) => {
    const {username,email,password} = req.body
    const user = await User.findOne({email});
    if(!user){
        return res.status(409).json({error:'user does not exist'})
    }
    const isauthenticated = await bcrypt.compare(password,user.passwordhash);
    if(!isauthenticated){
        return res.status(409).json({error:'incorrect password'})
    }

    const payload = {
        username:user.username
    }
    const token = jwt.sign(payload,config.SECRET,{expiresIn:3600});
    res.json({token:token,username:user.username})
})

module.exports = loginrouter