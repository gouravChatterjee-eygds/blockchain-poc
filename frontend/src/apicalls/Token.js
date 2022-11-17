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
      console.log(purchaseToken);
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
}

export default new Token();
