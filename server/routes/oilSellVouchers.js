const Oil = require("../models/Oil");
const OilSellVoucher = require("../models/OilSellVoucher");
const Customer = require("../models/Customer");

module.exports = app => {
  app.post("/api/oil_sell_vouchers", async (req, res) => {
    try {
      const { oilSells, carNumber } = req.body;
      const newOilSellVoucher = new OilSellVoucher({});
      let newOilSells = [];
      let toSaves = [];
      let oilSellVoucherTotalAmount = 0;
      let customer;
      customer = await Customer.findOne({ carNumber });
      if (!customer) {
        customer = new Customer({ carNumber });
      }
      toSaves.push(customer);
      for (const oilSell of oilSells) {
        const { oil, quantity } = oilSell;
        const existingOil = await Oil.findById(oil);
        existingOil.stock -= quantity;
        toSaves.push(existingOil);
        const totalAmount = existingOil.sellPrice * quantity;
        const sellPrice = existingOil.sellPrice;
        const newOilSell = {
          oil,
          sellPrice,
          totalAmount
        };
        newOilSells.push(newOilSell);
        oilSellVoucherTotalAmount += totalAmount;
      }
      newOilSellVoucher.oilSells = newOilSells;
      newOilSellVoucher.customer = customer;
      newOilSellVoucher.totalAmount = oilSellVoucherTotalAmount;
      toSaves.push(newOilSellVoucher);
      customer.buyRecords.push(newOilSellVoucher);
      for (const save of toSaves) {
        await save.save();
      }
      res.json({
        status: "success",
        message: "successfully created"
      });
    } catch (error) {
      res.json({
        status: "failed"
      });
    }
  });

  app.get("/api/oil_sell_vouchers", async (req, res) => {
    const oilSellVouchers = await OilSellVoucher.find({})
      .populate("customers")
      .populate("oilSells.oil");
    res.json({
      status: "success",
      message: "successfully found",
      data: { oilSellVouchers }
    });
  });
};
