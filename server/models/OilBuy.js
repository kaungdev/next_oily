const mongoose = require("mongoose");
const { Schema } = mongoose;

const oilBuySchema = new Schema({
  oil: { type: Schema.Types.ObjectId, ref: "oils", required: true },
  quantity: { type: Number, required: true },
  buyPrice: { type: Number, required: true },
  year: { type: String, required: true },
  month: { type: String, required: true },
  totalAmount: Number
});

module.exports = mongoose.model("oilBuys", oilBuySchema);
