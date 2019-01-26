# Mentora Security Considerations

To ensure Mentora maintains the highest levels of security, development is focused on:

1.  Adhering to [Ethereum Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/recommendations/)
2.  Extending proprietary smart contracts off of existing, audited contracts that are considered secure/best in class. (OpenZeppelin)
3.  Ensuring the minimum amount of data necessary is stored on chain (i.e., link hash on chain to data off chain)
4.  Using standard encryption to store data off chain (3Box handles this for profiles, but not yet integrated for IPFS storage).
5.  Work to minimize any use of centralized components to eliminate attack vectors. (may currently be vulnerable given the way 3Box is setup (pinning server) and the potential use of Infura as a gateway to IPFS)

## Partial Best Practices Checklist

### External Calls
All external calls are made to trusted contracts (OpenZeppelin). There are currently no untrusted contracts to mark and the calls are not making immediate state changes.  Safe tranfer functions are included in the OpenZeppelin contracts, but not currently implemented in the app.

### Remember that on-chain data is public
As per points 3 and 4 above, this is an ongoing consideration.  There is currently no private data being stored on chain.

### 2 Party Contracts
Currently not applicable

### Negation of most negative signed integer
SafeMath and other trusted utility contracts from OpenZeppelin are being used.

### Use of modifiers/require/assert
Modifiers are being appropriately applied to limit access to functions to authorized users.

### Use events to monitor contract activity
Any user interactions with the system emit appropriate events.

### Prefer new Solidity constructs
Contracts are using pragma ^0.5.0.

## Guard Against Common Attacks
1. Reentrancy - all functions have been checked in accordance with recommended best practices.
2. Integer Overflow and Underflow - all counter/math operations are done with OpenZeppelin SafeMath.sol.
3. DoS attacks - not currently an issue.
4. Insufficient Gas Griefing - conditions don't currently exist to allow this happen.
5. Forcibly Sending Ether to Contract - our current contracts are not payable.

