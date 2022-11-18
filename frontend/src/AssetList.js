import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useRef, useState } from "react";
import Asset from "./apicalls/Asset";
import Token from "./apicalls/Token";
import Menu from "./components/Menu";
import Modal from "./components/Modal";

function AssetList() {
  const address = useAddress();
  const [tokens, setTokens] = useState(0);
  const [listedAssets, setListedAssets] = useState([]);
  const [assetHistory, setAssetHistory] = useState([]);
  const modalRef = useRef(null);

  const getTokenBalance = async () => {
    let tokenBalance = await Token.tokenBalance(address);
    setTokens(tokenBalance?.balance);
  };

  const getAssetList = async () => {
    let listedAsstes = await Asset.allListedAssets();
    console.log(listedAsstes);
    setListedAssets(listedAsstes?.assetList);
  };

  const showHistory = async (tokenId) => {
    let astHistory = await Asset.assetHistory(address, tokenId);
    console.log(astHistory);
    setAssetHistory(astHistory.assetHistory);
    modalRef?.current?.setShowModal(true);
  };

  const buyAsset = async (tokenId) => {
    let buyAsset = await Asset.buyAsset(address, tokenId, Date.now());
    console.log(buyAsset);
    if (buyAsset.statusCode === 502) {
      alert("You do not have sufficient tokens");
    }
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
          {listedAssets.length === 0 && <h5>No asset listed</h5>}
          {listedAssets.map((asset) => {
            return (
              <div className="col-3 mt-4" key={asset.id}>
                <div className="card shadow">
                  <div className="card-body">
                    <h6>{asset.name}</h6>
                    <p className="mb-2">Token Id: {asset.id}</p>
                    <p className="mb-2">{asset.desc}</p>
                    <p>Cost: {asset.price} Tokens</p>
                    <p
                      onClick={() => showHistory(asset.id)}
                      className="underline text-blue-400 cursor-pointer"
                    >
                      History
                    </p>
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

        <Modal title="Asset History" ref={modalRef}>
          <div className="mx-auto px-10 text-left text-lg">
            {assetHistory.map((asset, i) => {
              let timeDate = new Date(asset.time).toString();
              var index = timeDate.lastIndexOf(":") + 3;
              timeDate = timeDate.substring(0, index);
              return (
                <div key={i}>
                  <h6>
                    {i + 1}. {asset.owner.substring(0, 20) + "..."}
                  </h6>
                  <h6 className="mb-3">{timeDate}</h6>
                </div>
              );
            })}
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default AssetList;
