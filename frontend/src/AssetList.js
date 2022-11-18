import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import Asset from "./apicalls/Asset";
import Token from "./apicalls/Token";
import Menu from "./components/Menu";

function AssetList() {
  const address = useAddress();
  const [tokens, setTokens] = useState(0);
  const [listedAssets, setListedAssets] = useState([]);

  const getTokenBalance = async () => {
    let tokenBalance = await Token.tokenBalance(address);
    setTokens(tokenBalance?.balance);
  };

  const getAssetList = async () => {
    let listedAsstes = await Asset.allListedAssets();
    console.log(listedAsstes);
    setListedAssets(listedAsstes?.assetList);
  };

  const buyAsset = async (tokenId) => {
    await Asset.buyAsset(address, tokenId, Date.now());
    getAssetList();
  };

  useEffect(() => {
    if (address) {
      getTokenBalance(address);
    }
  }, [address]);

  useEffect(() => {
    getAssetList();
  }, []);

  return (
    <div>
      <Menu />
      <div className="container">
        <div className="row">
          {listedAssets.map((asset) => {
            return (
              <div className="col-3 mt-4" key={asset.id}>
                <div className="card shadow">
                  <div className="card-body">
                    <h6>{asset.name}</h6>
                    <p className="mb-2">Token Id: {asset.id}</p>
                    <p className="mb-2">{asset.desc}</p>
                    <p>Cost: {asset.price} Tokens</p>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => buyAsset(asset.id)}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AssetList;
