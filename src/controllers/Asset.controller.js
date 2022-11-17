const AssetContractDetails = require("../contract-details/Asset.json");
const AssetContractAddress = require("../contract-details/contract-address.json");
const { Contract, providers } = require("ethers");

// Create the provide of localhost
const httpProvider = new providers.JsonRpcProvider("http://127.0.0.1:8545/");

const assetContract = (address) => {
  return new Contract(
    AssetContractAddress.Asset,
    AssetContractDetails.abi,
    httpProvider.getSigner(address)
  );
};

async function createAsset(req) {
  try {
    const assetContractDetails = assetContract(req.body.address);
    const transaction = await assetContractDetails.mintToken(
      req.body.name,
      req.body.desc,
      req.body.time
    );
    await httpProvider.waitForTransaction(transaction.hash);
    const trResponse = await httpProvider.getTransactionReceipt(
      transaction.hash
    );
    // console.log(trResponse);
    const tokenId = parseInt(trResponse.logs[0].topics[3], 16);
    return { statusCode: 200, tokenId: tokenId };
  } catch (error) {
    console.log(error);
    return { statusCode: 502 };
  }
}

async function getAssetList(req) {
  try {
    const assetContractDetails = assetContract(req.body.address);
    let getAssetList = await assetContractDetails.userAssetDetails();
    getAssetList = getAssetList.filter((asset) => asset.name !== "");
    let assetDetails = getAssetList.map((asset) => {
      return {
        id: asset.id.toNumber(),
        name: asset.name,
        desc: asset.desc,
        readyForSell: asset.price.toNumber() > 0,
        price: asset.price.toNumber(),
      };
    });
    return { statusCode: 200, assetDetails: assetDetails };
  } catch (error) {
    console.log(error);
    return { statusCode: 502 };
  }
}

async function listAsset(req) {
  try {
    let assetContractDetails = assetContract(req.body.address);
    await assetContractDetails.listAsset(req.body.tokenId, req.body.price);
    return { readyForSell: true, statusCode: 200 };
  } catch (error) {
    console.log(error);
    return { statusCode: 502 };
  }
}

async function buyAsset(req) {
  try {
    let assetContractDetails = assetContract(req.body.address);
    const transaction = await assetContractDetails.buyAsset(
      req.body.tokenId,
      req.body.time
    );

    await httpProvider.waitForTransaction(transaction.hash);

    return { statusCode: 200 };
  } catch (err) {
    console.error(`NFTMarketContract: `, err.message);
    return { success: false };
  }
}

async function getAssetOwnershipHistory(req) {
  try {
    const assetContractDetails = assetContract(req.body.address);

    let assetHistory = await assetContractDetails.getAssetHistory(
      req.body.tokenId
    );
    assetHistory = assetHistory.map((asset) => {
      return { owner: asset.owner, time: asset.time.toNumber() };
    });
    return { statusCode: 200, assetHistory: assetHistory };
  } catch (error) {
    console.error(`assetContract: `, err.message);
    return { success: false };
  }
}

module.exports = {
  createAsset,
  getAssetList,
  listAsset,
  buyAsset,
  getAssetOwnershipHistory,
};