pragma solidity ^0.5.0;

import "./ERC721X/ERC721XToken.sol";



contract Position is ERC721XToken {

    /// EVENTS

    event PositionAdded(uint256 indexed positionNumber, address indexed positionOwner);
    event VerificationStatus(string result);

    function name() external view returns (string memory) {
        return "Position";
    }

    function symbol() external view returns (string memory) {
        return "POS";
    }
/*
     function _setTokenURI(uint256 _tokenId, string memory _uri) internal {
        require(exists(_tokenId));
        _tokenURIs[_tokenId] = _uri;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(exists(tokenId));
        return _tokenURIs[tokenId];
    }
*/
    // fungible mint
    function mint(uint256 _tokenId, address _to, uint256 _supply) external {
        _mint(_tokenId, _to, _supply);
    }

    // nft mint
    function mintnft(uint256 _tokenId, address _to) external {
        _mint(_tokenId, _to);
        emit PositionAdded(_tokenId, _to);
    }
}