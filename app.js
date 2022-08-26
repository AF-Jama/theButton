const express = require('express')
require('dotenv').config()
const {ipMiddleware} = require('./middleware/private.js')
const {pressController,countDownTimer,getNumberOfClicks} = require('./controllers/press.js')
const {requestMiddleware} = require('./middleware/general.js')
const db = require('./models')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()


app.use(express.json())
// app.use(express.urlencoded({extended:false}))
// app.use(bodyParser.json())

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')


let counter = 60;

app.get('/',requestMiddleware,(req,res)=>{
    console.log(res)
    return res.render('index',{
        disabledStatus:false
    })
})

// '/timer' post endpoint that decrements counter on each post request
app.post('/timer',countDownTimer)

const reset = ()=>{
    // method to reset global variable 'counter' back to 60
    counter = 60;
}

app.post('/press',pressController)


app.get('/getTime',(req,res)=>{
    return res.send({
        number:counter
    })
})


app.get('/getClicks',getNumberOfClicks)
















// app.use((err,req,res,next)=>{
//     if(err){
//         res.send({
//             err: `Error message`,
//             msg:`${err}`
//         })
//     }
//     next(err)
// })

app.use(express.static(path.join(__dirname,'public')))

db.sequelize.sync().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Listening on port ${process.env.PORT}`)
    })
})