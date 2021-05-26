if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require ('express')
const app = express()
const expressLayouts = require ('express-ejs-layouts')
const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

app.use(express.static('public'))

const mongoose = require ('mongoose')


//connect to online databases with process environment, useNewUrlParser is an older way of accesing data
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true })
const db = mongoose.connection
//send a message if we get an error
db.on('error', error => console.error(error))
//send a message once we connect for the first time
db.once('open', () => console.log('Connected to mongoose'))

app.use('/', indexRouter) 

app.listen(process.env.PORT || 5000)