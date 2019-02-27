const mongoose = require("mongoose");
const { Schema } = mongoose;

const oilBuySchema = new Schema({
  oil: { type: Schema.Types.ObjectId, ref: "oils" },
  quantity: Number,
  buyPrice: Number,
  totalAmount: Number
});

module.exports = mongoose.model("oilBuys", oilBuySchema);
