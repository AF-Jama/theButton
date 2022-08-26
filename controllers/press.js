const db = require('../models')

const pressController = async (req,res,next)=>{
    const localIpAddress = req.ip; // gets local ip address from request object

    const {time} = req.body // destructures request payload
    console.log(`Time number is ${time}`)
    try {
        console.log("1a")
        await db.ipTable.create({ipAddress:localIpAddress,time:time}) // commits
        console.log("2a")
        reset()
        console.log("3a")
        return res.render('index')
        
    } catch (error) {
        console.log("ERROR BLOCK TRIGGEREED")
        return res.render('index')
    }

}

var countdown = new Date(Date.now()+60*1000)

const countDownTimer = (req,res,next)=>{
    let deltaTime = countdown.getTime() - Date.now();
    deltaTime = (deltaTime/1000).toFixed(0)
    if(deltaTime < 0) {
        clearInterval(timer)
        deltaTime = 0;
        return res.send({
            data: deltaTime
        });
    }
    return res.send({
        data: deltaTime
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