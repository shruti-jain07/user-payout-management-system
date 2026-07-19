const Withdrawal = require("../models/withdrawal.model");

class WithdrawalRepository {
  async createWithdrawal(withdrawalData) {
    return await Withdrawal.create(withdrawalData);
  }

  async getWithdrawalById(withdrawalId) {
    return await Withdrawal.findById(withdrawalId);
  }

  async updateWithdrawal(withdrawalId, updateData) {
    return await Withdrawal.findByIdAndUpdate(
      withdrawalId,
      updateData,
      {
        new: true,
      }
    );
  }
}

module.exports = new WithdrawalRepository();