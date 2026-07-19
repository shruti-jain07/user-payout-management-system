const express = require("express");
const withdrawalController = require("../controllers/withdrawal.controller");

const router = express.Router();

// Create Withdrawal
router.post("/", withdrawalController.createWithdrawal);

// Get Withdrawal
router.get("/:withdrawalId", withdrawalController.getWithdrawalById);

module.exports = router;