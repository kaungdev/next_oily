const mongoose = require("mongoose");
const moment = require("moment");
const { Schema } = mongoose;

const oilSellVoucherSchema = new Schema({
  oilSells: [
    {
      oil: {
        type: Schema.Types.ObjectId,
        ref: "oils",
        required: true
      },
      quantity: Number,
      sellPrice: Number,
      totalAmount: Number
    }
  ],
  totalAmount: Number,
  customer: { type: Schema.Types.ObjectId, ref: "customers", required: true },
  createdAt: { type: Date, default: Date.now() },
  month: { type: String, required: true, default: moment().format("MMM") },
  year: { type: String, required: true, default: moment().format("YY") }
});

module.exports = mongoose.model("oilSellVouchers", oilSellVoucherSchema);
