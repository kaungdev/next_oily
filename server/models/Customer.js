const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
  carNumber: { type: String, required: true },
  buyRecords: [
    {
      type: Schema.Types.ObjectId,
      ref: "oilSellRecords"
    }
  ]
});

module.exports = mongoose.model("customers", customerSchema);
