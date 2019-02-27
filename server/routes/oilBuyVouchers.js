// const Oil = require("../models/Oil");
const OilBuy = require("../models/OilBuy");
const OilBuyVoucher = require("../models/OilBuyVoucher");

module.exports = app => {
  app.post("/api/oil_buy_vouchers", async (req, res) => {
    const { oilBuys } = req.body;
    const newOilBuyVoucher = new OilBuyVoucher({});
    const newOilBuys = [];
    let toSaves = [];
    let oilBuyVoucherTotalAmount = 0;
    oilBuys.forEach(({ oil, quantity, buyPrice }) => {
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
    });
    newOilBuyVoucher.oilBuys = newOilBuys;
    newOilBuyVoucher.totalAmount = oilBuyVoucherTotalAmount;
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
    const oilBuyVouchers = await OilBuyVoucher.find({}).populate("oilBuys");
    res.json({
      status: "success",
      message: "successfully found",
      data: { oilBuyVouchers }
    });
  });
};
