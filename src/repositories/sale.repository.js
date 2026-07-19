const Sale = require("../models/sale.model");

class SaleRepository {
  async createSale(saleData) {
    return await Sale.create(saleData);
  }

  async getSaleById(saleId) {
    return await Sale.findById(saleId);
  }

  async updateSale(saleId, updateData) {
    return await Sale.findByIdAndUpdate(saleId, updateData, {
      new: true,
    });
  }

  async getEligibleSalesForAdvancePayout() {
  return await Sale.find({
    status: "PENDING",
    isAdvancePaid: false,
  });
}
}

module.exports = new SaleRepository();