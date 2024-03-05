const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    username:String,
    email:String,
    passwordhash:String
})

const User = mongoose.model('User',userschema,'users')

module.exports = User