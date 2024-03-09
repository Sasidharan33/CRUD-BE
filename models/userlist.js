const mongoose = require('mongoose')

const userlistmodel = new mongoose.Schema({
    Name:String,
    email:String,
    phone:Number,
    age:Number,
    createdat:{
        type:Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

const userlist = mongoose.model('userlist',userlistmodel,'Userlist')

module.exports = userlist