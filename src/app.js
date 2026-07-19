require("dotenv").config();

const express = require("express");
const connectDatabase = require("./config/database");

const userRoutes = require("./routes/user.routes");
const saleRoutes = require("./routes/sale.routes");
const advancePayoutRoutes = require("./routes/advancePayout.routes");
const withdrawalRoutes = require("./routes/withdrawal.routes");
const app = express();

app.use(express.json());

// Connect Database
connectDatabase();


const PORT = process.env.PORT || 3000;

app.use("/users", userRoutes);
app.use("/sales",saleRoutes);
app.use("/payouts",advancePayoutRoutes);
app.use("/withdrawals",withdrawalRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});