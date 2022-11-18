import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useRef, useState } from "react";
import Asset from "./apicalls/Asset";
import Menu from "./components/Menu";
import Modal from "./components/Modal";

function MyAssets() {
  const address = useAddress();
  const [listPrice, setListPrice] = useState(0);
  const [listedAssets, setListedAssets] = useState([]);
  const [assetDetails, setAssetDetails] = useState({
    name: "",
    desc: "",
  });
  const [assetHistory, setAssetHistory] = useState([]);
  const modalRef = useRef(null);

  const getAssetList = async () => {
    let listedAsstes = await Asset.assetListOfUser(address);
    console.log(listedAsstes);
    setListedAssets(listedAsstes?.assetList);
  };

  const updateAssetData = (event, formField) => {
    setAssetDetails({ ...assetDetails, [formField]: event.target.value });
  };

  const updateListPrice = (event) => {
    setListPrice(event.target.value);
  };

  const createAsset = async (e) => {
    e.preventDefault();
    // console.log(assetDetails);
    await Asset.createAsset(
      address,
      assetDetails.name,
      assetDetails.desc,
      Date.now()
    );
    setAssetDetails({
      name: "",
      desc: "",
    });
    getAssetList();
  };

  const listAsset = async (e, tokenId) => {
    e.preventDefault();
    await Asset.listAsset(address, tokenId, listPrice);
    getAssetList();
  };

  const showHistory = async (tokenId) => {
    let astHistory = await Asset.assetHistory(address, tokenId);
    console.log(astHistory);
    setAssetHistory(astHistory.assetHistory);
    modalRef?.current?.setShowModal(true);
  };

  useEffect(() => {
    if (address) {
      getAssetList();
    }
  }, [address]);

  return (
    <div>
      <Menu />
      <div className="container">
        <div className="row">
          <div className="col-4 pt-3">
            <h6 className="mb-4">Create New Asset</h6>
            <form method="POST" onSubmit={createAsset}>
              <div className="form-group">
                <label>Asset Name</label>
                <input
                  required
                  className="form-control"
                  name="name"
                  value={assetDetails.name}
                  onInput={(e) => updateAssetData(e, "name")}
                  placeholder="Asset Name"
                />
              </div>
              <div className="form-group">
                <label>Asset Description</label>
                <input
                  required
                  className="form-control"
                  name="desc"
                  value={assetDetails.desc}
                  onInput={(e) => updateAssetData(e, "desc")}
                  placeholder="Asset Description"
                />
              </div>
              <button
                className="btn btn-sm btn-success"
                disabled={address && address != "" ? false : true}
              >
                Create
              </button>
            </form>
          </div>
          <div className="col-8">
            <div className="row">
              {listedAssets.map((asset) => {
                return (
                  <div className="col-4 mt-4" key={asset.id}>
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
                        {asset.price === 0 && (
                          <form
                            method="POST"
                            onSubmit={(e) => listAsset(e, asset.id)}
                          >
                            <div className="row">
                              <div className="col-9 px-1">
                                <input
                                  required
                                  className="form-control"
                                  name="price"
                                  placeholder="Asset Price"
                                  onInput={(e) => updateListPrice(e)}
                                />
                              </div>
                              <div className="col-2 px-1">
                                <button className="btn btn-success btn-sm">
                                  List
                                </button>
                              </div>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
  );
}

export default MyAssets;
