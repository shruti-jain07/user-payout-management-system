const User = require("../models/user.model");

class UserRepository {
//create user
  async createUser(userData) {
    return await User.create(userData);
  }
//get user
  async getUserById(userId) {
    return await User.findById(userId);
  }
}

module.exports = new UserRepository();