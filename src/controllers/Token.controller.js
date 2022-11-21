const TokenContract = require("../contract-details/Token.json");
const TokenContractAddress = require("../contract-details/contract-address.json");
const { Contract, utils, providers } = require("ethers");

class TokenController {
  currencyContract(address) {
    let httpProvider = new providers.JsonRpcProvider("http://127.0.0.1:8545/");

    return new Contract(
      TokenContractAddress.Token,
      TokenContract.abi,
      httpProvider.getSigner(address)
    );
  }

  async mintCurrency(req, res) {
    try {
      console.log(req.body);
      let tokenContract = this.currencyContract(req.body.address);
      let transaction = await tokenContract.mintToken(req.body.amount, {
        value: utils.parseEther(req.body.amount).toString(),
      });
      // // console.log(transaction);
      await transaction.wait();
      return {
        statusCode: 200,
        // data: tokenContract,
        message: `You have successfully minted ${req.body.amount} tokens`,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 502,
        message: "Sorry please try again",
      };
    }
  }

  async transferCurrency(req, res) {
    try {
      const tokenContract = this.currencyContract(req.body.address);
      await tokenContract.transfer(req.body.to, req.body.amount);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getCurrencyBalance(req, res) {
    try {
      const tokenContract = this.currencyContract(req.body.address);
      const balance = (
        await tokenContract.balanceOf(req.body.address)
      ).toString();
      return { statusCode: 200, balance: balance };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 502,
      };
    }
  }
}

module.exports = new TokenController();
