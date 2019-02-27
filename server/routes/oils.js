const Oil = require("../models/Oil");

module.exports = app => {
  app.post("/api/oils", async (req, res) => {
    const { name, sellPrice } = req.body;
    await new Oil({ name, sellPrice }).save();
    res.json({
      status: "success",
      message: "successfully created new oil"
    });
  });

  app.get("/api/oils", async (req, res) => {
    const oils = await Oil.find({});
    res.json({
      status: "success",
      message: "successfully found",
      data: { oils }
    });
  });
};
