const saleRepository = require("../repositories/sale.repository");
const userRepository = require("../repositories/user.repository");
const financialTransactionRepository = require("../repositories/financialTransaction.repository");

class AdvancePayoutService {
  async processAdvancePayout() {
    const eligibleSales =
      await saleRepository.getEligibleSalesForAdvancePayout();

    for (const sale of eligibleSales) {
      const ADVANCE_PERCENTAGE = 0.10;
      const advanceAmount = sale.earning * ADVANCE_PERCENTAGE;

      // Update Sale
      await saleRepository.updateSale(sale._id, {
        advanceAmount,
        isAdvancePaid: true,
      });

      // Get User
      const user = await userRepository.getUserById(sale.userId);

      // Update User Balance
      await userRepository.updateUser(sale.userId, {
        withdrawableBalance:
          user.withdrawableBalance + advanceAmount,
      });

      // Create Financial Transaction
      await financialTransactionRepository.createTransaction({
        userId: sale.userId,
        saleId: sale._id,
        type: "ADVANCE_PAYOUT",
        amount: advanceAmount,
      });
    }

    return {
      processedSales: eligibleSales.length,
    };
  }
}

module.exports = new AdvancePayoutService();