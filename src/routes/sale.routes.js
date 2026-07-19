const express = require("express");
const saleController = require("../controllers/sale.controller");

const router = express.Router();

// Create Sale
router.post("/", saleController.createSale);

// Get Sale by ID
router.get("/:saleId", saleController.getSaleById);

// Reconcile Sale
router.patch("/:saleId/reconcile", saleController.reconcileSale);

module.exports = router;