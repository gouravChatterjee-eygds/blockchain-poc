//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// We import this library to be able to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// This is the main building block for smart contracts.
contract Token is ERC20, Ownable {
    constructor() ERC20("Token", "CURRENCY") {}

    function mintToken(uint256 amount) public payable returns (bool) {
        _mint(msg.sender, amount);
        return true;
    }

    function transferToken(
        address receiver,
        uint256 amount
    ) public returns (bool) {
        return transfer(receiver, amount);
    }

    function approveToken(
        address tokenOwner,
        address tokenBuyer,
        uint256 amount
    ) public returns (bool) {
        _approve(tokenOwner, tokenBuyer, amount);
        return true;
    }
}
