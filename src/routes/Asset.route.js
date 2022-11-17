const express = require("express");
const router = express.Router();
const AssetController = require("../controllers/Asset.controller");

router.post("/asset/create", async (req, res) => {
  try {
    const response = await AssetController.createAsset(req);
    res.status(response.statusCode).send(response);
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
});

router.post("/asset/getlist", async (req, res) => {
  try {
    const response = await AssetController.getAssetList(req);
    res.status(response.statusCode).send(response);
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
});

router.post("/asset/list", async (req, res) => {
  try {
    const response = await AssetController.listAsset(req);
    res.status(response.statusCode).send(response);
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
});

router.post("/asset/buy", async (req, res) => {
  try {
    const response = await AssetController.buyAsset(req);
    res.status(response.statusCode).send(response);
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
});

router.post("/asset/history", async (req, res) => {
  try {
    const response = await AssetController.getAssetOwnershipHistory(req);
    res.status(response.statusCode).send(response);
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
});

module.exports = router;
