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

// Get asset list of a particluar user
router.post("/asset/getlistofuser", async (req, res) => {
  try {
    const response = await AssetController.getAssetListofUser(req);
    res.status(response.statusCode).send(response);
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
});

// Get all the listed assets for sell
router.get("/asset/getlistedassets", async (req, res) => {
  try {
    const response = await AssetController.getListedAssetList();
    res.status(response.statusCode).send(response);
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
});

// Create listing for the asset
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
