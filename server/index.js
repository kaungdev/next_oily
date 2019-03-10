const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const next_app = next({ dev });
const handle = next_app.getRequestHandler();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/oily", {
  useNewUrlParser: true
});

const runExpress = () => {
  const app = express();

  //   require("./models/TravelInfo");

  // app.use(morgan("dev"));
  app.use(bodyParser.json());

  require("./routes/oils")(app);
  require("./routes/oilBuyVouchers")(app);

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  app.use(function(err, req, res, next) {
    return res.json({
      status: "failed",
      err
    });
  });

  app.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
};

if ((isRunClient = false)) {
  next_app.prepare().then(() => {
    runExpress();
  });
} else {
  runExpress();
}
