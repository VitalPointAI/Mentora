pragma solidity ^0.5.0;

import "./../../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "./../../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol";
import "./../../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Enumerable.sol";
import "./../../node_modules/openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "./../../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Burnable.sol";

/// @title VP Course
/// @author Vital Point AI (Aaron Luhning)
/// @notice Contract that extends ERC721 to issue NFTs to represent courses in the system

contract Course is ERC721Burnable, Pausable, ERC721Enumerable, ERC721Metadata, ERC721Full  {

    constructor(
    ) 
    ERC721Full("Courses", "VPA")
    public {
       
    }

    /// TYPE DECLARATIONS
    /// STATE VARIABLES

    /// EVENTS
    event CourseAdded(address indexed courseOwner, uint256 indexed courseNumber, string courseInformation);

    /// FUNCTIONS

    /// mintWithCourseUri
    /// @param _to - address of owner of the course (token) (eth account address)
    /// @param _tokenId - unique token Id (e.g. course number)
    /// @param _tokenURI - uri to offchain data stored on IPFS associated with this course
    /// @dev creates a new course, attributing it to an owner and pointing to off chain data

    function mintWithCourseUri(address _to, uint256 _tokenId, string calldata _tokenURI) external returns (bool) {
        
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
        emit CourseAdded(_to, _tokenId, _tokenURI);
        return true;
    }

    /// getLastCourseNumber
    /// @param _supply - uint256 representing total number of courses that currently exist.
    ///                  passed in from web app as result of totalSupply() call.
    /// @dev returns last course that was made so we can derive an unique course number for the 
    ///      next course being made (done in the web app).

    function getLastCourseNumber(uint256 _supply) public view returns (uint256) {
        return tokenByIndex(_supply.sub(1));
    }
}