console.log('Hola')
const port = 6969;
const Server = require('./utils/server');
const sv = new Server(port);
sv.listen();