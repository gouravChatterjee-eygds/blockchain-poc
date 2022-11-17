import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import Token from "./apicalls/Token";
import Menu from "./components/Menu";

function AssetList() {
  const address = useAddress();
  const [tokens, setTokens] = useState(0);

  const getTokenBalance = async () => {
    let tokenBalance = await Token.tokenBalance(address);
    setTokens(tokenBalance?.balance);
  };

  const getAssetList = async () => {
    //
  };

  useEffect(() => {
    if (address) {
      getTokenBalance(address);
    }
  }, [address]);

  useEffect(() => {}, []);

  return (
    <div>
      <Menu />
    </div>
  );
}

export default AssetList;
