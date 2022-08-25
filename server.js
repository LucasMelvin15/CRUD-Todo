//npm init 
//npm install express dotenv cors mongoose
//npm install nodemon --sav-dev
//change the start to nodemon server js so you can run npm start


//declare variables
const  express = require ('express')
const app = express()
PORT = 8000
const mongoose = require('mongoose')
const connectDB = require('./config/database')

const homeRoutes = require("./routes/home")
const editRoutes = require("./routes/edit")
require('dotenv').config()

//add model variable



 
connectDB()

//set middlewares
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))


// set routes
app.use('/', homeRoutes)
app.use('/edit', editRoutes)


app.listen(PORT,() => console.log(`server is running on ${PORT}`))