import { useEffect, useState } from "react";
import { ConnectWallet } from "./ConnectWallet";

function Token() {
  const [tokens, setTokens] = useState(0);
  const [token, setToken] = useState(0);
  const [address, setAddress] = useState("");
  const [matic, setMatic] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  async function _connectWallet() {
    // This method is run when the user clicks the Connect. It connects the
    // dapp to the user's wallet, and initializes it.

    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Once we have the address, we can initialize the application.

    // First we check the network
    if (!_checkNetwork()) {
      return;
    }

    _initialize(selectedAddress);

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      _stopPollingData();
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state
      if (newAddress === undefined) {
        return _resetState();
      }

      _initialize(newAddress);
    });

    // We reset the dapp state if the network is changed
    window.ethereum.on("chainChanged", ([networkId]) => {
      _stopPollingData();
      _resetState();
    });
  }

  function _initialize(userAddress) {
    // This method initializes the dapp

    // We first store the user's address in the component's state
    // setState({
    //   selectedAddress: userAddress,
    // });
    setAddress(userAddress);

    // Then, we initialize ethers, fetch the token's data, and start polling
    // for the user's balance.

    // Fetching the token data and the user's balance are specific to this
    // sample project, but you can reuse the same initialization pattern.
    _initializeEthers();
    _getTokenData();
    _startPollingData();
  }

  async function _initializeEthers() {
    // We first initialize ethers by creating a provider using window.ethereum
    _provider = new ethers.providers.Web3Provider(window.ethereum);

    // Then, we initialize the contract using that provider and the token's
    // artifact. You can do this same thing with your contracts.
    let _token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      _provider.getSigner(0)
    );
    setToken(_token);
  }

  function _startPollingData() {
    _pollDataInterval = setInterval(() => _updateBalance(), 1000);

    // We run it once immediately so we don't have to wait for it
    _updateBalance();
  }

  function _stopPollingData() {
    clearInterval(_pollDataInterval);
    _pollDataInterval = undefined;
  }

  // The next two methods just read from the contract and store the results
  // in the component state.
  async function _getTokenData() {
    const name = await token.name();
    const symbol = await token.symbol();

    setState({ tokenData: { name, symbol } });
  }

  async function _updateBalance() {
    const balance = await token.balanceOf(state.selectedAddress);
    setState({ balance });
  }

  const showPurchaseToken = () => {
    return (
      <div className="flex flex-col items-center">
        <h1>Purchase Tokens</h1>
        <input
          type="number"
          placeholder="Amount of tokens"
          className="poc-input"
          value={tokens}
          onChange={(e) => setTokens(e.target.value)}
        />
        <div>MATIC equivalent: {matic}</div>
        <button className="btn-cus bg-blue-500 hover:bg-blue-600 mt-8">
          Purchase
        </button>
      </div>
    );
  };
  return (
    <div className="px-4 md:px-20 mx-0 w-full mx-auto min-h-screen">
      <div className="flex flex-col items-center">
        <h5 className="text-center">Manage Your Tokens!</h5>
        {address && address !== "" ? (
          <div className="flex flex-col items-center">
            your address is {address}
            {showPurchaseToken()}
            <button className="btn-cus bg-red-500 hover:bg-red-600 mt-8">
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <ConnectWallet
            connectWallet={() => _connectWallet()}
            networkError={state.networkError}
            dismiss={() => _dismissNetworkError()}
          />
        )}
        <h5 className="text-center italic mt-8">{loadingMessage}</h5>
      </div>
    </div>
  );
}
export default Token;
