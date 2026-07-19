const mongoose = require("mongoose");

const financialTransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    saleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "ADVANCE_PAYOUT",
        "FINAL_PAYOUT",
        "RECOVERY_ADJUSTMENT",
        "FAILED_PAYOUT_RECOVERY",
      ],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "FinancialTransaction",
  financialTransactionSchema
);