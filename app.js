const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config/config')
const app = express();
const usersrouter = require('./controllers/Users');
const loginrouter = require('./controllers/login');


mongoose.set('strictQuery',false)

mongoose.connect(config.mongodb_uri)
.then(()=> {
    console.log('connected to mongodb')
})
.catch((err)=> {
    console.log(err)
})



app.use(cors())
app.use(express.json())

app.use('/api/users',usersrouter)
app.use('/api/login',loginrouter)

module.exports = app;