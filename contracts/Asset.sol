// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./Token.sol";

struct AssetHistory {
    address owner;
    uint256 time;
}

struct AssetDetails {
    uint256 id;
    string name;
    string desc;
    uint256 price;
}

contract Asset is ERC721, Ownable, ERC721Enumerable {
    Token currencyToken;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => AssetDetails) private asset;
    mapping(uint256 => AssetHistory[]) private ownershipHistory;

    constructor(address tokenAddress) ERC721("AssetNFT", "NFTASSET") {
        currencyToken = Token(tokenAddress);
    }

    function mintToken(
        string memory name,
        string memory desc,
        uint256 time
    ) public returns (uint256) {
        uint256 tokenID = _tokenIdCounter.current();
        address userAddress = msg.sender;
        _tokenIdCounter.increment();
        _safeMint(userAddress, tokenID);
        asset[tokenID] = AssetDetails(tokenID, name, desc, 0);
        ownershipHistory[tokenID].push(AssetHistory(userAddress, time));
        return tokenID;
    }

    function buyAsset(uint256 tokenID, uint256 time) public returns (bool) {
        require(
            currencyToken.balanceOf(msg.sender) >= asset[tokenID].price,
            "You don't have enough currency"
        );
        currencyToken.approveToken(
            msg.sender,
            address(this),
            asset[tokenID].price
        );
        bool paymentDone = currencyToken.transferFrom(
            msg.sender,
            lastAssetOwner(tokenID),
            asset[tokenID].price
        );
        if (paymentDone) {
            ERC721(address(this)).transferFrom(
                address(this),
                msg.sender,
                tokenID
            );
            ownershipHistory[tokenID].push(AssetHistory(msg.sender, time));
            asset[tokenID].price = 0;
            return true;
        } else {
            return false;
        }
    }

    function userAssetDetails() public view returns (AssetDetails[] memory) {
        uint256 contractBalance = balanceOf(address(this));
        uint256 assetOwnerBalance = balanceOf(msg.sender);
        address userAddress = msg.sender;
        require(
            assetOwnerBalance >= 0,
            "Transaction can not be processed! No balance"
        );
        AssetDetails[] memory assetDetails = new AssetDetails[](
            assetOwnerBalance + contractBalance
        );
        for (uint256 i = 0; i < assetOwnerBalance; i++) {
            assetDetails[i] = asset[tokenOfOwnerByIndex(userAddress, i)];
        }

        if (address(this) != userAddress) {
            for (uint256 i = 0; i < contractBalance; i++) {
                uint256 contractTokenID = tokenOfOwnerByIndex(address(this), i);
                if (lastAssetOwner(contractTokenID) == userAddress) {
                    assetDetails[i + assetOwnerBalance] = asset[
                        contractTokenID
                    ];
                }
            }
        }

        return assetDetails;
    }

    function getAssetHistory(uint256 tokenID)
        public
        view
        returns (AssetHistory[] memory)
    {
        return ownershipHistory[tokenID];
    }

    function listAsset(uint256 tokenId, uint256 price) public returns (bool) {
        require(price > 0, "Please provide a price");
        require(lastAssetOwner(tokenId) == msg.sender, "Not correct owner");
        transferFrom(msg.sender, address(this), tokenId);
        asset[tokenId].price = price;
        return true;
    }

    function lastAssetOwner(uint256 tokenID) public view returns (address) {
        return
            ownershipHistory[tokenID][ownershipHistory[tokenID].length - 1]
                .owner;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
