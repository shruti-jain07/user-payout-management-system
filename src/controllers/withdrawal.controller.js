const withdrawalService = require("../services/withdrawal.service");

class WithdrawalController {
  async createWithdrawal(req, res) {
    try {
      const { userId, amount } = req.body;

      const withdrawal = await withdrawalService.createWithdrawal(
        userId,
        amount
      );

      return res.status(201).json({
        success: true,
        message: "Withdrawal request created successfully.",
        data: withdrawal,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getWithdrawalById(req, res) {
    try {
      const { withdrawalId } = req.params;

      const withdrawal = await withdrawalService.getWithdrawalById(
        withdrawalId
      );

      return res.status(200).json({
        success: true,
        data: withdrawal,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new WithdrawalController();