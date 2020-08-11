const config = require('./app-config');
module.exports = function (key) {
    return config[process.env.NODE_ENV][key]
}