var eviroment = process.env.NODE_ENV ? process.env.NODE_ENV : 'local';
module.exports = require('./' + eviroment + '.json');