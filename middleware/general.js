const db = require('../models')

const requestMiddleware = async (req,res,next)=>{
    const localIp = req.ip;
    try {
        const exist = db.ipTable.findOne({where:{ipAddress:localIp}})
        if(!exist){
            // triggerd if no column exists that matches ip address
            return next() // next middleware
        }
        throw new Error('Ip already has pressed the button')
    } catch (error) {
        return res.render('index')
    }
}




module.exports = {
    requestMiddleware
}