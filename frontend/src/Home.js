import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import Token from "./apicalls/Token";
import Menu from "./components/Menu";

function Home() {
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();
  const [tokens, setTokens] = useState(0);
  const [purchaseTokens, setPurchaseTokens] = useState(0);
  const [alertMsg, setAlertMsg] = useState("");
  const purchaseToken = async () => {
    setAlertMsg("");
    if (!purchaseTokens || purchaseTokens === 0) {
      return;
    }
    let purchaseToken = await Token.purchaseToken(
      address,
      purchaseTokens.toString()
    );
    setAlertMsg(purchaseToken?.message);
    setPurchaseTokens(0);
    getTokenBalance();
    // console.log(purchaseToken);
  };

  const getTokenBalance = async () => {
    let tokenBalance = await Token.tokenBalance(address);
    console.log(tokenBalance);
    setTokens(tokenBalance.balance);
  };

  useEffect(() => {
    if (address) {
      getTokenBalance(address);
    }
  }, [address]);

  const showPurchaseToken = () => {
    return (
      <div className="flex flex-col items-center">
        <h5>Purchase Tokens</h5>
        <input
          type="number"
          placeholder="Amount of tokens"
          className="form-control"
          value={purchaseTokens}
          onChange={(e) => setPurchaseTokens(e.target.value)}
        />
        <button
          className="btn btn-sm btn-primary mt-4"
          disabled={address && address != "" ? false : true}
          onClick={purchaseToken}
        >
          Purchase
        </button>
        <h6 className="mt-4">{alertMsg}</h6>
      </div>
    );
  };

  return (
    <div>
      <Menu />
      <div className="container mx-auto pt-4">
        <h5 className="text-center">Welcome to NFT Market Place</h5>
        <div className="row mt-4 pt-3">
          <div className="col-6">
            {address && address !== "" ? (
              <div className="text-center mx-center">
                <h6>Wallet Address: {address}</h6>
                <h6 className="mt-3">Total Currency Tokens: {tokens}</h6>
                {/* {showPurchaseToken()} */}
                <button
                  className="btn btn-sm btn-danger mt-4"
                  onClick={disconnect}
                >
                  Disconnect Wallet
                </button>
              </div>
            ) : (
              <div className="mx-auto text-center mt-4">
                <h6>Please connect your wallet to continue</h6>
                <button
                  className="btn btn-sm btn-success mt-4"
                  onClick={connectWithMetamask}
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
          <div className="col-6 px-4">{showPurchaseToken()}</div>
        </div>

        {/* <h5 className="text-center italic mt-8">{loadingMessage}</h5> */}
      </div>
    </div>
  );
}

export default Home;
