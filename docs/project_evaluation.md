# Final Project Evaluation Notes

Greetings and welcome to my final project for the Consensys Blockchain Developer Program.  In an effort to make your evaluation of my project easier and to potentially answer some questions you may have, I've included this checklist of the requirements along with my comments and demo instructions for how to use the app.

If something still isn't clear regarding whether I've fulfilled a requirement, please contact me and I'll be more than happy to provide additional clarification.

## Project Evaluation Requirements

### 1. Project includes a README.md that explains the project
Yes - here is the [README.md](https://github.com/VitalPointAI/Mentora/blob/master/README.md)

### 2. The project is a Truffle project that allows you to easily compile, migrate and test the Solidity contracts.
Yes.  Please note that this project will continue to be developed after this course.  As such, there are some contracts and web app components in the package that are not currently functional/implemented.  Please disregard the Position.sol contract and related components.  Course.sol and VPAttribute.sol provide the current functionality.

### 3. Project is commented as outlined in the documentation.
Yes.

### 4. At least one contract uses a library or inherits from another contract.
Yes, for example - Course.sol inherits from several OpenZeppelin contracts.

### 5. I can run the app on a dev server locally for testing/grading (connecting to a testnet if required)
Yes - readme contains details for setting up on localhost which is the recommended option at this time.  However, it could be deployed to one of the testnets as well with some minor configuration changes.

### 6. I can visit a URL and interact with the app (can be localhost)
Yes - once the app is installed/running and ng serve --open has opened the browser, the app is running on localhost:4200

### 7. The app displays the current ethereum account.
Yes - navigate to Admin page and you'll see current account on top right corner.  As well, the profile page displays current account (truncated to fit)

### 8. I can sign transactions using Metamask (or Uport)
Yes - MetaMask - navigate to admin and enter a course.  On submit you'll be asked to confirm.  As well, the 3Box integration will require you to sign transactions to interact with your profile.

### 9. The app interface reflects updates to the contract state.
Yes - in several ways. Once a course is added, you'll see it on the courses page.  You'll see the information populated as it is pulled from IPFS and ethereum addresses will resolve to names based on the 3Box integration. If you change accounts, you'll see the relevant information on the profile page.

### 10.  5 tests written in Javascript or Solidity (or both)
Yes - 5 tests in Javascript

### 11. Tests are explained with brief code comments
Yes

### 12. Tests are properly structured
Yes

### 13. All tests pass
Yes

### 14. At least one of the contracts implements a circuit breaker/emergency stop pattern.
Yes - Courses.sol inherits the Pausable contract from OpenZeppelin.  It provides tested functions to pause/restart contract functions.

### 15. design_pattern_decisions.md file that explains design decisions I've made
Yes - [design_patterns_decisions.md](https://github.com/VitalPointAI/Mentora/blob/master/docs/design_pattern_decisions.md)

### 16. Design patterns.md adequately describes the design patterns implemented
Yes - I believe it does.  Document at para 15.

### 17. Project includes a file avoiding_common_attacks.md...
Yes - [avoiding_common_attacks](https://github.com/VitalPointAI/Mentora/blob/master/docs/avoiding_common_attacks.md)

### 18. The avoiding common attacks file covers at least three common attacks and how app mitigates risk.
Yes - I believe it does.  Document at para 17.

### 19. Project includes a deployed_addresses.txt that describes where the deployed testnet contracts live.
in progress

### 20. Project uses IPFS
Yes - check the console when adding a course.  If you set things up using instructions in readme and have an IPFS node running, you'll see it connect to the node and push course data into a JSON file hosted on IPFS.  The web app then calls that information to populate data in relevant components.

### 21.  Project uses an upgradable design pattern for smart contracts
No - not at this time.

### 22. At least one contract is written in Vyper or LLL
No - all contracts are in Solidity

### 23. The app uses Uport for user authentication/signing or sending transactions.
No - Uport has not currently been integrated.

### 24. The app uses the Ethereum Name Service to resolve human readable names to Ethereum addresses.
Not exactly - but I have integrated 3Box to do the same thing.  See profile page where one can set a name to their address.  Then, add a course and you'll see the course owner's name instead of their Ethereum address.

### 25. The project uses an Oracle service such as Oraclize
No - not at this time.