const mongoose = require("mongoose");
const moment = require("moment");
const { Schema } = mongoose;

const oilBuyVoucherSchema = new Schema({
  oilBuys: [
    {
      type: Schema.Types.ObjectId,
      ref: "oilBuys",
      required: true
    }
  ],
  totalAmount: Number,
  year: { type: String, required: true, default: moment().format("YY") },
  // month: { type: String, required: true, default: moment().format("MMM") },
  month: { type: String, required: true, default: "Apr" },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("oilBuyVouchers", oilBuyVoucherSchema);
