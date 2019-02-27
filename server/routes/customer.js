const Customer = require("../models/Customer");

module.exports = app => {
  app.get("/api/customers", async (req, res) => {
    const customers = await Customer.find({});
    res.json({
      status: "success",
      message: "successfully found customers",
      data: { customers }
    });
  });
};
