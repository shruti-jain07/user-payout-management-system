const advancePayoutService = require("../services/advancePayout.service");

class AdvancePayoutController {
  async processAdvancePayout(req, res) {
    try {
      const result = await advancePayoutService.processAdvancePayout();

      return res.status(200).json({
        success: true,
        message: "Advance payouts processed successfully.",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AdvancePayoutController();