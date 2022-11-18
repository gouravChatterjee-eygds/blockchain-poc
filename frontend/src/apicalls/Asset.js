const apiUrl = "http://localhost:3001";
class Asset {
  createAsset = async (address, name, desc, time) => {
    try {
      let createAsset = await fetch(`${apiUrl}/asset/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          name,
          desc,
          time,
        }),
      });
      console.log(createAsset);
      createAsset = await createAsset.json();
      return createAsset;
    } catch (error) {
      console.log(error);
    }
  };
  assetListOfUser = async (address) => {
    try {
      let assetListOfUser = await fetch(`${apiUrl}/asset/getlistofuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
        }),
      });
      console.log(assetListOfUser);
      assetListOfUser = await assetListOfUser.json();
      return assetListOfUser;
    } catch (error) {
      console.log(error);
    }
  };

  allListedAssets = async () => {
    try {
      let allListedAssets = await fetch(`${apiUrl}/asset/getlistedassets`, {
        method: "GET",
      });
      allListedAssets = await allListedAssets.json();
      return allListedAssets;
    } catch (error) {
      console.log(error);
    }
  };

  listAsset = async (address, tokenId, price) => {
    try {
      let listAsset = await fetch(`${apiUrl}/asset/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          tokenId,
          price,
        }),
      });
      listAsset = await listAsset.json();
      return listAsset;
    } catch (error) {
      console.log(error);
    }
  };

  buyAsset = async (address, tokenId, time) => {
    try {
      let listAsset = await fetch(`${apiUrl}/asset/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          tokenId,
          time,
        }),
      });
      listAsset = await listAsset.json();
      return listAsset;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new Asset();
