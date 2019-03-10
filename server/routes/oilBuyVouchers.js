const moment = require("moment");

const Oil = require("../models/Oil");
const OilBuy = require("../models/OilBuy");
const OilBuyVoucher = require("../models/OilBuyVoucher");

module.exports = app => {
  app.post("/api/oil_buy_vouchers", async (req, res) => {
    const { oilBuys } = req.body;
    const newOilBuyVoucher = new OilBuyVoucher({});
    const newOilBuys = [];
    let toSaves = [];
    let oilBuyVoucherTotalAmount = 0;
    for (const oilBuy of oilBuys) {
      const { oil, quantity, buyPrice } = oilBuy;
      const existingOil = await Oil.findById(oil);
      existingOil.stock += quantity;
      const totalAmount = buyPrice * quantity;
      oilBuyVoucherTotalAmount += totalAmount;
      const newOilBuy = new OilBuy({
        oil,
        quantity,
        buyPrice,
        totalAmount
      });
      newOilBuys.push(newOilBuy);
      toSaves.push(newOilBuy);
      toSaves.push(existingOil);
    }
    const days = moment()
      .format("MMM YY")
      .split(" ");
    newOilBuyVoucher.oilBuys = newOilBuys;
    newOilBuyVoucher.totalAmount = oilBuyVoucherTotalAmount;
    newOilBuyVoucher.month = days[0];
    newOilBuyVoucher.year = days[1];

    toSaves.push(newOilBuyVoucher);
    for (const save of toSaves) {
      await save.save();
    }
    res.json({
      status: "success",
      message: "successfully created"
    });
  });

  app.get("/api/oil_buy_vouchers", async (req, res) => {
    const oilBuyVouchers = await OilBuyVoucher.find({}).populate({
      path: "oilBuys",
      populate: {
        path: "oil"
      }
    });
    res.json({
      status: "success",
      message: "successfully found",
      data: { oilBuyVouchers }
    });
  });
};
