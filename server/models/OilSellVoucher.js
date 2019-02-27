const mongoose = require("mongoose");
const { Schema } = mongoose;

const oilSellVoucherSchema = new Schema({
  oil: { type: Schema.Types.ObjectId, ref: "oils" },
  sellPrice: Number,
  quantity: Number,
  customer: { type: Schema.Types.ObjectId, ref: "customers" },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("oilSellVouchers", oilSellVoucherSchema);
