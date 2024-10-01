const { Router } = require('express');
const {
  findAllBook,
  createBook,
  findBook,
  deleteBook,
  updateBook,
} = require('../controllers/book.controller.js');
const { validatorHandler } = require('../middleware/validate.handler');
const { findAllDto, findOneDto } = require('../dto/general.dto');
const { createBookDto, updateBookDto } = require('../dto/book.dto');
const BookRouter = Router();

BookRouter.get('/', [validatorHandler(findAllDto)], findAllBook);
BookRouter.get('/:id', [validatorHandler(findOneDto)], findBook);
BookRouter.post('/', [validatorHandler(createBookDto)], createBook);
BookRouter.put('/:id', [validatorHandler(updateBookDto)], updateBook);
BookRouter.delete('/:id', [validatorHandler(findOneDto)], deleteBook);

module.exports = BookRouter;
