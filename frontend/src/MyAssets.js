import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import Asset from "./apicalls/Asset";
import Token from "./apicalls/Token";
import Menu from "./components/Menu";

function MyAssets() {
  const address = useAddress();
  const [listPrice, setListPrice] = useState(0);
  const [listedAssets, setListedAssets] = useState([]);
  const [assetDetails, setAssetDetails] = useState({
    name: "",
    desc: "",
  });

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
              <button className="btn btn-sm btn-success">Create</button>
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
    </div>
  );
}

export default MyAssets;
