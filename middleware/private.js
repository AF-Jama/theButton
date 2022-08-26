const requestIp = require('request-ip');


const ipMiddleware = function(req, res, next) {
    const clientIp = requestIp.getClientIp(req);
    next();
};

module.exports = {
    ipMiddleware
};
