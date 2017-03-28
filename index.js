
const server = require('./configs/custom-express')('dev');

server.listen(process.env.PORT);
console.log('Server running on port: ' + process.env.PORT);