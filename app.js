require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const config2 = require('config')
const chalk = require('chalk')

//node inspect app.js {chrome://inspect}
//Exports Middlewire
const setMiddleWire = require('./custom middlewire/middlewire')
//Exports Route
const setroute = require('./routes/routes')

const appp = express()
appp.set('view engine', 'ejs')
appp.set('views', 'views')
appp.use(express.static(__dirname + '/public'));
// appp.use( express.static('public'))

//Using middleWire from middleWire dir
setMiddleWire(appp)
//Using routes from routes dir
setroute(appp)

// appp.use((req,res,next)=> {
//     let err = new Error (`404 Page Not Found`)
//     err.status = 404
//     next(err)
// })

// appp.use((err,req,res,next) => {
//     if (err.status === 404) {
//         return res.render('pages/error/404err', {title: "404 Not Found",flashMessage : {}})
//     }else{
//          return res.render('pages/error/500err', {title: "Internal Error",flashMessage : {}})
//      }
// })


const port = process.env.port || 800
mongoose.connect(`mongodb://localhost/${process.env.DB_COLLECTION}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {appp.listen(port, () => {
        console.log(`Server running at ${port}`)})})
        
    .catch(e => console.log(e))
    mongoose.set('useCreateIndex', true);


    // https://github.com/Imtiaz4530/Cropper
