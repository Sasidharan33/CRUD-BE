require('dotenv').config()

const mongodb_uri = process.env.mongodb_uri;
const PORT = process.env.PORT;
const SECRET= process.env.SECRET

module.exports = {
    mongodb_uri,
    PORT,
    SECRET
}