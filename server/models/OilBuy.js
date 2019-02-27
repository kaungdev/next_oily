const mongoose = require("mongoose");
const { Schema } = mongoose;

const oilBuySchema = new Schema({
  oil: { type: Schema.Types.ObjectId, ref: "oils", required: true },
  quantity: Number,
  buyPrice: Number,
  totalAmount: Number
});

module.exports = mongoose.model("oilBuys", oilBuySchema);
