![alt text](https://github.com/VitalPointAI/Mentora/blob/master/src/assets/mentora-logo.png "Mentora Logo")
# Mentora

Mentora is a decentralized marketplace for mentorship. By directly connecting those who want to pass on knowledge and advice (mentors) with those who want to receive it (mentees), Mentora helps mentees shortcut learning curves to rapidly attain goals while providing mentors with unhindered market opportunities.

## The Mentora System
The Mentora system is built on top of Ethereum and uses an Angular web app interface hosted on IPFS.  Utilising smart contracts to facilitate mentor/mentee relationships and interaction, Mentora eliminates the traditional middle man structure found in other learning marketplaces. This means individuals gain direct access to mentors who are eager to pass on their knowledge on their terms. There is no third party setting prices, dictating terms or siphoning off exorbitant fees.

*Full Disclosure: Mentora will eventually establish fair transaction fees to help facilitate ongoing development. They will be implemented using smart contracts and therefore 100% transparent.*

Mentora is aiming to provide opportunities for both mentors and mentees:

### Mentors

Anyone desiring to pass on knowledge is a potential mentor. Mentora provides mentors with a platform to connect with potential mentees to create courses, deliver content, and promote themselves to potential mentees (people who are looking for a mentor in specific subject). They can offer a variety of mentoring services including online and offline mentorship opportunities, all brokered directly with interested mentees.  They can choose to transfer ownership rights or license their content to create mentorship networks.  All is handled on Ethereum, meaning content ownership verification is possible helping to prevent issues of theft or misappropriation.

### Mentees

The quickest way to attain a goal is to be mentored by someone who has already done what you want to do. Being a mentee means your mentor will be able to help you avoid the pitfalls and focus on what works best (or at least what worked best for them). Mentora provides a mentor marketplace where potential mentees can locate the best mentors in their desired field. A mentor/mentee relationship can form based on established terms that are enforced by the underlying blockchain technology. 

### Reputation

Mentora's reputation system establishes a confidence score for each mentor and mentee. This score is a quantitative representation of trust. Interactions contribute to the confidence score allowing relationships between mentors/mentees to start at a mutual level of trust commesurate with their scores.  

In other words, mentors don't want to waste their time and energy trying to motivate someone who doesn't really want to put in the effort needed to succeed.  Likewise, mentees don't want to waste their time and energy possibly being led in the wrong direction by a mentor who really has no clue what they are doing.  The confidence score is an attempt to highlight the good while warning about the bad.

### Key Integrations: Staking a Future on Decentralization, Cryptographic Security, and Personal Data Ownership

At Mentora, we've 100% bought into the idea of a decentralized and cryptographically secure world.  Our ultimate goal is to eliminate any points of centralization in the system without sacrificing security or usability (understanding there's usually a tradeoff to be made there).  To that end, Mentora has several integrations that facilitate a decentralized, censorship resistant, secure platform where users can protect and maintain control over all their data and content.

#### 3Box
[3Box](https://3box.io/) is a social, peer to peer, distributed user data network that supports public and private data for Ethereum users. Each user has two data stores - one public and one private.  When 3Box creates a new database (OrbitDB) for a user, a decentralized identity (DID) is derived from the user's Ethereum address.  A mapping from the address to the DID and the DID to the root store is kept allowing us to securely associate a user's Ethereum address with their data.

Mentora uses 3Box to create mentor and mentee social profiles.  Any data a user chooses to add can be accessed by other Dapps that they allow access to meaning a user can manage their online identities/data in one location. It becomes the single source of truth for any application using the integration and the user controls who gets to see it.

These profiles are an important part of the system to build rich, mutually supporting relationships between mentor and mentee.

#### Inter Planetary File System (IPFS)
[IPFS](https://ipfs.io) is a protocol aiming to decentralize the web.  It enables the creation of completely decentralized and distributed applications, using content addressing and digital signatures.  That's all good stuff.

Using IPFS, Mentora eliminates the need to store data on a central server.  The application files and content data is added to IPFS and runs from there.  With our business logic on the Ethereum blockchain talking to IPFS, essentially that means, nobody is going to be hacking us, turning us off, or otherwise interfering with how things work.

## Getting Started (Setting Up for Evaluation)

### WARNING: Mentora is not yet encrypting content data being stored on IPFS.  Do not add anything you potentially do not want other people to see.

**Evaluators - after setting things up below, please refer to the provided [project evaluation notes](https://github.com/VitalPointAI/Mentora/blob/master/docs/project_evaluation.md)**

### Running from localhost
1.  Clone the repo to a project folder on your computer
2.  Run `npm install` from that project folder
3.  Ensure Ganache is running
4.  Get an IPFS daemon running (follow instructions on https://ipfs.io:
   Run the following two config commands before starting the daemon:
   `ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '[\"*\"]'`
   `ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '[\"PUT\", \"GET\", \"POST\"]'`
5.  Start an IPFS daemon running on default ports.  Gateway on port 8080/API server on port 5001.  
6.  Ensure you have MetaMask installed in your Chrome browser
7.  Connect MetaMask to the locally running blockchain (custom RPC - usually `http://127.0.0.1:7545`)
8.  Import at least two accounts from your Ganache blockchain into MetaMask. (Recommend naming one Mentor and the other Mentee)
9.  Run `ng serve --open` from the project directory.  This will start up a server and open a Chrome tab.
10.  If you're connected to the Ganache chain, you'll see the app show up.  MetaMask will ask you to sign a couple transactions to allow access to 3Box. This is so you can setup profiles. (allows Mentora to display relevant information from your profile, add you to add relevant information to your profile and let you interact with human readable names instead of Ethereum addresses).
11.  At this point, the application is setup, running and you can interact with it.  Please refer to the provided [project evaluation notes](https://github.com/VitalPointAI/Mentora/blob/master/docs/project_evaluation.md)

### Running from Rinkeby/IPFS
in progress

## Shameless Support Plug

If you like what Mentora is up to and want to help speed up development...

**send some Eth: 0x7f7c65C084d6F6B7463AfF0e36a816567b378230**

#### Thanks for checking out Mentora.



