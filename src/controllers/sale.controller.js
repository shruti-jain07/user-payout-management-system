const saleService = require("../services/sale.service");

class SaleController {
  async createSale(req, res) {
    try {
      const sale = await saleService.createSale(req.body);

      return res.status(201).json({
        success: true,
        message: "Sale created successfully.",
        data: sale,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getSaleById(req, res) {
    try {
      const { saleId } = req.params;

      const sale = await saleService.getSaleById(saleId);

      return res.status(200).json({
        success: true,
        data: sale,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async reconcileSale(req, res) {
    try {
      const { saleId } = req.params;
      const { status } = req.body;

      const sale = await saleService.reconcileSale(saleId, status);

      return res.status(200).json({
        success: true,
        message: "Sale reconciled successfully.",
        data: sale,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new SaleController();