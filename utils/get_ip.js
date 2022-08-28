const fetch = require('node-fetch')
require('dotenv').config()


// gets user public ip address using fetch libary (async/await)
const getUserIpAddresses = async (token)=>{
    let response = await fetch(`https://ipinfo.io/json?token=${token}`)
    response = await response.json()

    return response.ip; // returns ip address promise value
}




module.exports = {
    getUserIpAddresses
}