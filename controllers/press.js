const db = require('../models')
const {getUserIpAddresses} = require('../utils/get_ip.js')
require('dotenv').config()

const pressController = async (req,res,next)=>{
    // const localIpAddress = req.ip; // gets local ip address from request object

    const {time} = req.body // destructures request payload
    const t = await db.sequelize.transaction()
    console.log(`Time number is ${time}`)
    try {
        console.log("1a")
        if(time === '0') throw new Error('Cannot click button as time has hit 0')
        const localIpAddress = await getUserIpAddresses(process.env.TOKEN)
        console.log(`Ip addresses is ${localIpAddress}`)
        await db.ipTable.create({ipAddress:localIpAddress,time:time},{transaction:t}) // commits
        await t.commit()
        console.log("2a")
        reset()
        console.log("3a")
        return res.render('index')
        
    } catch (error) {
        await t.rollback()
        console.log("ERROR BLOCK TRIGGEREED")
        console.log(error)
        return res.render('index')
    }

}

var countdown = new Date(Date.now()+60*1000)

const countDownLogic = ()=>{
    let deltaTime = countdown.getTime() - Date.now();
    deltaTime = (deltaTime/1000).toFixed(0)
    
    return deltaTime;
}

const countDownTimer = (req,res,next)=>{
    let deltaTime = countDownLogic()
    if(deltaTime <= 0) {
        deltaTime = 0;
        // clearInterval(timer)
        return res.json({
            "data": 0
        });
    }
    return res.json({
        "data": deltaTime
    });
}

const reset = ()=>{
    countdown = new Date(Date.now()+60*1000);
}

const getNumberOfClicks = async (req,res,next)=>{
    try{
        let numberOfClicks = await db.ipTable.count()
        console.log(`Number of clicks ${numberOfClicks}`)
        return res.send({
            number:numberOfClicks
        })
    }catch(err){
        return res.send({
            number:NaN
        })
    }
}



module.exports = {
    pressController,
    countDownTimer,
    getNumberOfClicks
}