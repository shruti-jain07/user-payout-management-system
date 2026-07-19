const FinancialTransaction = require("../models/financialTransaction.model");

class FinancialTransactionRepository {
  async createTransaction(transactionData) {
    return await FinancialTransaction.create(transactionData);
  }
}

module.exports = new FinancialTransactionRepository();