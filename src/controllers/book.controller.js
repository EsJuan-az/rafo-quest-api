const BookService = require("../services/book.service.js");
const { success } = require("../utils/response");

module.exports = {
  async findAllBook(req, res, next) {
    const { offset = 0, limit = 10 } = req.query;
    try {
      const resp = await BookService.findAll(offset, limit);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async findBook(req, res, next) {
    const { id } = req.params;
    try {
      const resp = await BookService.findOne(id);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  },
  async createBook(req, res, next){
    try {
      const resp = await BookService.create(req.body);
      return success(req, res, 201, resp)
    }catch(err){
      next(err);
    }
  },
  async updateBook(req, res, next){
    const { id } = req.params;
    try {
      const resp = await BookService.update(id, req.body);
      return success(req, res, 200, resp)
    }catch(err){
      next(err);
    }
  },
  async deleteBook(req, res, next){
    const { id } = req.params;
    try {
      const resp = await BookService.delete(id);
      return success(req, res, 200, resp);
    } catch (err) {
      next(err);
    }
  }
};
