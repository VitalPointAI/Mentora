pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

/// @title VP Attribution
/// @author Vital Point AI (Aaron Luhning)
/// @notice Contract used to attribute a hash of information 
///         to a specific address (owner).

contract VPAttribute {

    /// TYPE DECLARATIONS

    // Associates hash with attestation information
    mapping(uint256 => Attestation) public hashToAttestation;
    mapping(address => Attestation) attestations;
    address[] public attestationIssuerAccounts;
    Attestation[] public allAttestations;

    // Attributes hash to an owner -> can look up all hashes belonging to an address
    // A hash can only have one owner (as it contains owner specific information)
    mapping(address => uint256) public ownerOfHash;
    mapping(uint256 => address) public hashToOwner;
    
    struct Attestation {
        address attesteeId;
        string attestationId;
        uint256 attestationDataHash;
        bool exists;
    }
    
    /// STATE VARIABLES

    uint256 public attestationCounter;
    
    /// EVENTS

    event AttestationAdded(address indexed attestationCreator, string attestationId, uint256 attestationHash);
    event VerificationStatus(string result);

    /// FUNCTIONS
       
    /// addAttestation
    /// @param _attesteeId - unique identification string (eth account address)
    /// @param _attestationId - unique identification string of the attestation (e.g. qualification code)
    /// @param _attestationDataHash - uint hash of attestation data (e.g. certificate data/course report)
    /// @param attestationCounter - number - attestation counter
    /// @param attestationCreator - eth address that is creating this attestation (owner)
    /// @param exists - variable set to 0 or 1 indicating that attestation exists (for verify function)
    /// @dev stores hash created from data and owner specific information and attributes to a specific owner
     
    function addAttestation (
        address _attesteeId, 
        string memory _attestationId,
        uint256 _attestationDataHash
    ) 
        public 
    {    
        address attestationCreator = msg.sender;
        attestationCounter++;
        bool exists = true;

        uint256 attestationHash = uint256(keccak256(abi.encodePacked(
            _attesteeId, 
            _attestationId, 
            _attestationDataHash
        )));

        Attestation storage attestation = attestations[attestationCreator];
        attestation.attesteeId = _attesteeId;
        attestation.attestationId = _attestationId;
        attestation.attestationDataHash = _attestationDataHash;
        attestation.exists = true;

        allAttestations.push(attestation) -1;

        attestationIssuerAccounts.push(attestationCreator) -1;
        
        hashToAttestation[attestationHash] = Attestation(
            _attesteeId,
            _attestationId,
            _attestationDataHash,
            exists
        );
        
        ownerOfHash[attestationCreator] = attestationHash;
        hashToOwner[attestationHash] = _attesteeId;
        
        
        emit AttestationAdded(attestationCreator, _attestationId, attestationHash);
    }

    /// verifyAttestation
    /// @param _attesteeId - unique identification string (eth account address)
    /// @param _attestationId - unique identification string of the attestation (e.g. qualification code)
    /// @param _attestationDataHash - hash of attestation data (e.g. certificate data/diploma data/course report)
    /// @param _attestationCounter - number - attestation counter
    /// @param exists - boolean indicating whether an attestation exists or not
    /// @dev confirms hash of inputs matches stored hash and returns inputs for manual verification

    function verifyAttestation(
        address _attesteeId, 
        string memory _attestationId,
        uint256 _attestationDataHash
    ) 
        public 
        returns(
            address, 
            string memory, 
            uint256
        ) 
    {
        
       uint attestationHash = uint256(keccak256(abi.encodePacked(
            _attesteeId, 
            _attestationId, 
            _attestationDataHash
        )));

        Attestation storage attestation = hashToAttestation[attestationHash];

        if(attestation.exists) {
            emit VerificationStatus('Attestation Verification Succeeded!');
            return (
            attestation.attesteeId,
            attestation.attestationId, 
            attestation.attestationDataHash
            );
        }
        emit VerificationStatus('Attestation Verification Failed!');
        return (
            address(0),
            "no attestation Id", 
            0
        );
    }

    /// getIssuedAttestations
    /// @dev returns all attestations issued

    function getIssuedAttestations(
    ) 
        public
        view
        returns(
            address[] memory
        ) 
    {
       return attestationIssuerAccounts;
    }

    /// getAttestation
    /// @param _address - address of owner of attestation
    /// @dev returns attestation of an owner

    function getAttestation(
        address _address
    ) 
        public
        view
        returns(
            address,
            string memory,
            uint256,
            bool
        ) 
    {
       return (
           attestations[_address].attesteeId,
           attestations[_address].attestationId,
           attestations[_address].attestationDataHash,
           attestations[_address].exists
       );
    }

    /// getAllAttestations
    /// @dev returns attestation of an owner

    function getAllAttestations(
    ) 
        public
        view
        returns(
            Attestation[] memory
        ) 
    {
       return allAttestations;
    }
    
}