const userRepository = require("../repositories/user.repository");

class UserService {
  async createUser(userData) {
    const user = await userRepository.createUser(userData);

    return user;
  }

  async getUserById(userId) {
    const user = await userRepository.getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

module.exports = new UserService();