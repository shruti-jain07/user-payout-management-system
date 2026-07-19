const saleRepository = require("../repositories/sale.repository");
const userRepository = require("../repositories/user.repository");
const financialTransactionRepository=require("../repositories/financialTransaction.repository")

class SaleService {
  async createSale(saleData) {
    // Every new sale starts as PENDING
    saleData.status = "PENDING";

    const sale = await saleRepository.createSale(saleData);

    return sale;
  }

  async getSaleById(saleId) {
    const sale = await saleRepository.getSaleById(saleId);

    if (!sale) {
      throw new Error("Sale not found");
    }

    return sale;
  }

 async reconcileSale(saleId, status) {
  const sale = await saleRepository.getSaleById(saleId);

  if (!sale) {
    throw new Error("Sale not found");
  }

  if (sale.status !== "PENDING") {
    throw new Error("Sale has already been reconciled");
  }
    if (!sale.isAdvancePaid) {
      throw new Error("Advance payout has not been processed for this sale.");
    }
  if (!["APPROVED", "REJECTED"].includes(status)) {
    throw new Error("Invalid sale status");
  }

  // Update Sale Status
  const updatedSale = await saleRepository.updateSale(saleId, {
    status,
    reconciledAt: new Date(),
  });

  if (status === "APPROVED") {
    const remainingPayout =
      sale.earning - sale.advanceAmount;

    await userRepository.updateWithdrawableBalance(
      sale.userId,
      remainingPayout
    );

    await financialTransactionRepository.createTransaction({
      userId: sale.userId,
      saleId: sale._id,
      type: "FINAL_PAYOUT",
      amount: remainingPayout,
    });
  } else {
    await userRepository.updateWithdrawableBalance(
      sale.userId,
      -sale.advanceAmount
    );

    await financialTransactionRepository.createTransaction({
      userId: sale.userId,
      saleId: sale._id,
      type: "RECOVERY_ADJUSTMENT",
      amount: sale.advanceAmount,
    });
  }

  return updatedSale;
}
}

module.exports = new SaleService();