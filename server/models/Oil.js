const mongoose = require("mongoose");
const { Schema } = mongoose;

const oilSchema = new Schema({
  name: { type: String, required: true },
  stock: { type: Number, default: 0 },
  sellPrice: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("oils", oilSchema);
