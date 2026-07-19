const express = require("express");
const advancePayoutController = require("../controllers/advancePayout.controller");

const router = express.Router();

router.post("/advance", advancePayoutController.processAdvancePayout);

module.exports = router;