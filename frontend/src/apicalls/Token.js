const apiUrl = "http://localhost:3001";
class Token {
  purchaseToken = async (address, amount) => {
    try {
      let purchaseToken = await fetch(`${apiUrl}/token/mint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          amount,
        }),
      });
      purchaseToken = await purchaseToken.json();
      return purchaseToken;
    } catch (error) {
      console.log(error);
    }
  };

  tokenBalance = async (address) => {
    try {
      let tokenBalance = await fetch(`${apiUrl}/token/balance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
        }),
      });
      tokenBalance = await tokenBalance.json();
      return tokenBalance;
    } catch (error) {
      console.log(error);
    }
  };

  transferToken = async (address, receiver, amount) => {
    try {
      let transferToken = await fetch(`${apiUrl}/token/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          receiver,
          amount,
        }),
      });
      transferToken = await transferToken.json();
      return transferToken;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new Token();
