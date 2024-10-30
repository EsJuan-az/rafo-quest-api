const express = require('express');
const cors = require('cors');
const UserRouter = require('../routes/user.route');
const BookRouter = require('../routes/book.route');

const {
  logErrors,
  ormErrorHandler,
  boomErrorHandler,
  errorHandler,
} = require('../middleware/error.handler');
const UserBookDataRouter = require('../routes/user_book_data.route');

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
    this.app.use('/book-data', UserBookDataRouter);
    // Configuración intermedia.
    this.app.get('/', (req, res) => {
      res.send('<h1>Rafo quest</h1>');
    });
  }
  settings() {
    this.app.use(cors());
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
