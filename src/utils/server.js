const express = require('express');
const UserRouter = require('../routes/user.route');
const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } = require('../middleware/error.handler');
class Server { 
  constructor(port){
    this.port = port;
    this.app = express();
    this.setMiddlewares();
    this.setRoutes();
  }
  setRoutes(){
    this.app.use('/user', UserRouter);
    // Configuración intermedia.
    this.app.get('/', (req, res) => {
      res.send('<h1>Rafo quest</h1>');
    });
  }
  setMiddlewares(){
    this.app.use(express.json());
    this.app.use(logErrors);
    this.app.use(ormErrorHandler);
    this.app.use(boomErrorHandler);
    this.app.use(errorHandler);
  }
  listen(){
    this.app.listen(this.port, () => {
      console.log(`🚀Listening on http://localhost:${this.port}`)
    })
  }
}
module.exports = Server;