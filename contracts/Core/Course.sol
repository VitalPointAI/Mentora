pragma solidity ^0.5.0;

import "./../../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "./../../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol";
import "./../../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol";



contract Course is ERC721Metadata, ERC721Full, ERC721Mintable   {

    constructor(
    ) 
    ERC721Full("Courses", "VPA")
    public {
       
    }
    // defines mapping to track the addresses of all mentors (people who have created courses)
    mapping(uint256=>address) public mentors;

    /// EVENTS

    event CourseAdded(address indexed courseOwner, uint256 indexed courseNumber, string courseInformation);


   
    function mintWithCourseUri(address _to, uint256 _tokenId, string calldata _tokenURI) external onlyMinter returns (bool) {
        
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
        emit CourseAdded(_to, _tokenId, _tokenURI);
        return true;
    }

    
}