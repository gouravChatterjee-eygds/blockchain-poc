const apiUrl = "http://localhost:3001";
class Asset {
  assetList = async (address, amount) => {
    try {
      let assetList = await fetch(`${apiUrl}/asset/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          amount,
        }),
      });
      console.log(assetList);
      assetList = await assetList.json();
      return assetList;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new Asset();
