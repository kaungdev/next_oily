const mongoose = require("mongoose");
const { Schema } = mongoose;

const oilSellVoucherSchema = new Schema({
  oil: { type: Schema.Types.ObjectId, ref: "oils", required: true },
  sellPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  customer: { type: Schema.Types.ObjectId, ref: "customers", required: true },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("oilSellVouchers", oilSellVoucherSchema);
