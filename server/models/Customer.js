const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
  carNumber: String,
  buyRecords: [
    {
      type: Schema.Types.ObjectId,
      ref: "oilSellRecords"
    }
  ]
});

module.exports = mongoose.model("customers", customerSchema);
