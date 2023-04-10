const express = require("express");
const router = express.Router();
const TokenController = require("../controllers/Token.controller");

router.post("/token/mint", async (req, res) => {
  try {
    const response = await TokenController.mintCurrency(req, res);
    res.status(response.statusCode).send(response);
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
});

router.post("/token/balance", async (req, res) => {
  try {
    const response = await TokenController.getCurrencyBalance(req, res);
    res.status(response.statusCode).send(response);
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
});

router.post("/token/transfer", async (req, res) => {
  try {
    const response = await TokenController.transferTokens(req, res);
    res.status(response.statusCode).send(response);
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
});

module.exports = router;
