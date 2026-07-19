const withdrawalRepository = require("../repositories/withdrawal.repository");
const userRepository = require("../repositories/user.repository");

class WithdrawalService {
  async createWithdrawal(userId, amount) {
    // Check if user exists
    const user = await userRepository.getUserById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    // Check withdrawable balance
    if (user.withdrawableBalance < amount) {
      throw new Error("Insufficient withdrawable balance.");
    }

    // Check 24-hour withdrawal restriction
    if (user.lastWithdrawalAt) {
      const lastWithdrawalTime = new Date(user.lastWithdrawalAt).getTime();
      const currentTime = Date.now();

      const HOURS_24 = 24 * 60 * 60 * 1000;

      if (currentTime - lastWithdrawalTime < HOURS_24) {
        throw new Error("User can make only one withdrawal every 24 hours.");
      }
    }

    // Deduct balance
    await userRepository.updateWithdrawableBalance(userId, -amount);

    // Update last withdrawal time
    await userRepository.updateUser(userId, {
      lastWithdrawalAt: new Date(),
    });

    // Create withdrawal
    const withdrawal = await withdrawalRepository.createWithdrawal({
      userId,
      amount,
      status: "PENDING",
    });

    return withdrawal;
  }

  async getWithdrawalById(withdrawalId) {
    const withdrawal = await withdrawalRepository.getWithdrawalById(
      withdrawalId
    );

    if (!withdrawal) {
      throw new Error("Withdrawal not found.");
    }

    return withdrawal;
  }
}

module.exports = new WithdrawalService();