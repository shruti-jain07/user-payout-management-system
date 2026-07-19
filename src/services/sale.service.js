const saleRepository = require("../repositories/sale.repository");

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

    const updatedSale = await saleRepository.updateSale(saleId, {
      status,
      reconciledAt: new Date(),
    });

    return updatedSale;
  }
}

module.exports = new SaleService();