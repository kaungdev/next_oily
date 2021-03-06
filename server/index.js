const express = require("express");
const next = require("next");
const morgan = require("morgan");
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

const app = express();

const runExpress = () => {
  const app = express();

  //   require("./models/Image");
  //   require("./models/TravelInfo");

  //   app.use(morgan("dev"));
  app.use(bodyParser.json());

  //   require("./routes/general")(app);
  //   require("./routes/travelInfo")(app);

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
};

if ((isRunClient = true)) {
  next_app.prepare().then(() => {
    runExpress();
  });
} else {
  runExpress();
}
