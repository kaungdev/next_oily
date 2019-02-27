const mongoose = require("mongoose");
const { Schema } = mongoose;

const oilBuyVoucherSchema = new Schema({
  oilBuys: [
    {
      type: Schema.Types.ObjectId,
      ref: "oilBuys"
    }
  ],
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("oilBuyVouchers", oilBuyVoucherSchema);
