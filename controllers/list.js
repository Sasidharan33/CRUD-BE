const listrouter = require('express').Router()
const userlist = require('../models/userlist');
const jwt = require('jsonwebtoken')
const config = require('../config/config');
const User = require('../models/users');


const getTokenFrom = (req) => {
    const authHeader = req.get('authorization')
    if(authHeader && authHeader.startsWith('bearer ')){
        return authHeader.replace('bearer ','')
      }
      else{
        return null
      }
}
listrouter.get('/:_id',async(req,res) => {
    const _id = req.params._id;
    console.log(_id)
    const lists = await userlist.findById(_id)
    console.log(lists)
    if(!lists){
        return res.status(409).json({message:'invalid'}); 
    }
    res.json(lists)
})

listrouter.get('/',async(req,res) => { 
    const token = getTokenFrom(req)
    console.log(token)
    const decodedtoken = jwt.verify(token, config.SECRET);
    
    if(!decodedtoken){
        return res.status(409).json({message:'token invalid'}); 
    }
    const user = await User.findOne(decodedtoken.id);
    console.log(user)
    if(!user){
        return res.status(409).json({message:'user not found'})
    }
    console.log(user.id)
    const users = await userlist.find({user :user._id})
    console.log(users)  
         res.json(users)
    
})
listrouter.put('/:_id',async(req,res) => {
    const id = req.params._id;
    const updateddata = req.body
    console.log(id)
    const update = await userlist.findByIdAndUpdate(id,updateddata,{new:true})
    if(!update){
        return res.status(409).json({message:'invalid'}); 
    }
    res.json(update)
})

listrouter.delete('/:_id',async(req,res) => {
    const id = req.params._id
    const delet = await userlist.findByIdAndDelete(id)
    if(!delet){
        return res.status(409).json({message:'post not found'}); 
    }
    else{
        return res.status(200).json({message:'deleted successfully'})
    }
})
 

listrouter.post('/',async(req,res) => {
    const {Name,email,phone,age} = req.body;
    const token = getTokenFrom(req)
    console.log(token)
    const decodedtoken = jwt.verify(token, config.SECRET);
    console.log(decodedtoken)
    if(!decodedtoken){
        return res.status(409).json({message:'token invalid'});
    }
    const user = await User.findOne(decodedtoken.id);
    console.log(user)
    if(!user){
        return res.status(409).json({message:'user not found'})
    }
    const list = new userlist({
        Name:Name,
        email:email,
        phone:phone,
        age:age,
        user:user._id
    })
    const savedlist = await list.save();
    res.json(savedlist)

})

module.exports= listrouter