const express = require('express');
const UserRouter = require('../routes/user.route');
const BookRouter = require('../routes/book.route');
const {
  logErrors,
  ormErrorHandler,
  boomErrorHandler,
  errorHandler,
} = require('../middleware/error.handler');
class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.settings();
    this.setRoutes();
    this.setMiddlewares();
  }
  setRoutes() {
    this.app.use('/user', UserRouter);
    this.app.use('/book', BookRouter);
    // Configuración intermedia.
    this.app.get('/', (req, res) => {
      res.send('<h1>Rafo quest</h1>');
    });
  }
  settings() {
    this.app.use(express.json());
  }
  setMiddlewares() {
    this.app.use(logErrors);
    this.app.use(ormErrorHandler);
    this.app.use(boomErrorHandler);
    this.app.use(errorHandler);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀Listening on http://localhost:${this.port}`);
    });
  }
}
module.exports = Server;
