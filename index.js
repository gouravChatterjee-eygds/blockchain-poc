const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const TokenRoutes = require("./src/routes/Token.route");
const AssetRoutes = require("./src/routes/Asset.route");

app.use("/", TokenRoutes);
app.use("/", AssetRoutes);

app.listen(port, () => {
  console.log(`POC app listening at http://localhost:${port}`);
});
