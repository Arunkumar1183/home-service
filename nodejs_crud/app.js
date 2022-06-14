const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const app = express()


dotenv.config({
    path:"./credentials.env"
})

app.set('view engine' , 'hbs')
app.use(express.urlencoded({extended : false}))
app.use(express.json())

const public_dir = path.join(__dirname ,'./public') 

app.use(express.static(public_dir))


app.use('/' , require('./routes/pages'))
app.use('/auth' , require('./routes/auth'))


//port listening
app.listen(3000 , () => {
    console.log("Server started at 3000..")
})