const { notFound } = require('@hapi/boom');
const {
  models: { User },
} = require('../libs/sequelize');
class UserService {
  static async findAll(offset, limit) {
    const result = await User.findAll({
      offset,
      limit,
    });
    return result;
  }
  static async findOrCreateByAuth0Id(auth0Id, data) {
    let result = await User.findOne({
      where: {
        auth0Id,
      },
    });
    if (!result) {
      if (!data) {
        throw notFound('user not found');
      }
      result = User.create({
        auth0Id,
        name: data.name,
        avatar: data.avatar,
      });
    }
    return result;
  }
  static async findOne(id) {
    const result = await User.findOne({
      where: {
        id,
      },
    });
    if (!result) {
      throw notFound('user not found');
    }
    return result;
  }
  static async create(user) {
    const result = await User.create(user);
    return result;
  }
  static async update(id, user) {
    const old = await UserService.findOne(id);
    const result = await old.update(user, { new: true });
    return result;
  }
  static async delete(id) {
    const result = await UserService.findOne(id);
    result.destroy();
    return result;
  }
}
module.exports = UserService;
