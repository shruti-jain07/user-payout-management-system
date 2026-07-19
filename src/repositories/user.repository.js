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

  async updateUser(userId, updateData) {
  return await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  });
  }

  async updateWithdrawableBalance(userId, amount) {
  return await User.findByIdAndUpdate(
    userId,
    {
      $inc: {
        withdrawableBalance: amount,
      },
    },
    {
      new: true,
    }
  );
}
}

module.exports = new UserRepository();