const app = require('./app')
const config = require('./config/config')

app.listen(config.PORT,() => {
    console.log(`server mis running on ${config.PORT}`)
})