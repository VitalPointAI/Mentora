var VPAttribute = artifacts.require("./VPAttribute.sol");
var Positions = artifacts.require("./Position.sol");
var Courses = artifacts.require("./Course.sol");
var ERC721XToken = artifacts.require("./ERC721XToken.sol");
var ERC721XTokenNFT = artifacts.require("./ERC721XTokenNFT.sol");
var ObjectLib = artifacts.require("./ObjectLib.sol");

module.exports = function(deployer) {
  deployer.deploy(VPAttribute);
  deployer.deploy(Positions);
  deployer.deploy(Courses);
  deployer.deploy(ObjectLib);
  deployer.deploy(ERC721XTokenNFT);
  deployer.deploy(ERC721XToken);
};
