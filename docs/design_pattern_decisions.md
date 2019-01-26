# Design Pattern Decisions

Several design patterns were/are being considered while developing Mentora.

## Courses

Mentors must have the ability to create courses.  Courses will all contain similar types of information, but the information itself is different from course to course (ie., title, description, category, etc...).  Further, every course needs to be able to be owned by a mentor and that mentor should have the ability to transfer that course to another owner, or burn it if so desired.  This led to using ERC721 NFTs for each course.  Mentors currently have the ability to mint an ERC721 token extended with Metadata and Enumerable.  This decision allows Mentora to treat every course as unique, assign it a unique ID number based on the course number of the last course minted, and extend it with data stored off chain.  

## Content Storage

It would undoubtedly be far too expensive to store all course content and data on chain.  By extending ERC721 using Metadata and Enumerable, Mentora includes a tokenURI on chain that points to a JSON file stored on IPFS.  The JSON file contains all the data related to the course.  This design consideration was built in from the start and will ultimately include the angular web app as well for a completely decentralized solution.

Storing emitted events in an external database is also being considered.  Right now, the web app makes use of events as a storage mechanism to provide some of the data needed to output content in components. It's not currently known what kind of impact scanning the entire chain for all emitted events will have on usability on the main net as the number of daily users grows.  If it turns out to be negative, Mentora will probably look to integrate OrbitDB or IPFS for event storage as well.   

## Mentor and Mentee Profiles

When considering how users, both mentors and mentees, are going to interact it was necessary to find a way to ensure users maintained control of their data and that meant either building a decentralized profile solution or integrating with something that does that already.  Initially considered building an OrbitDB based solution, but after hearing about and investigating 3Box, they were already well down the road to building shareable social profiles.  Mentora is leveraging 3Box to give mentors the ability to promote themselves with publicly available data that could follow them to other applications.  These user profiles for both mentors and mentees are important to facilitate trust when establishing and growing mentor/mentee relationships.

## Reputation

While not yet fully functional/tested, Mentora has an attestation module that integrates social profiles from 3Box with mentor/mentee interactions to produce a confidence score.  Mentora needed a way to rapidly set a baseline level of trust to make establishing a mentor/mentee relationship easier.  The score gives both the mentor and the mentee an initial indication of how committed each party will be to the relationship before time and effort is spent on developing it further.  Some basic social verifications such as those available through 3Box will help to establish a minimum level of identity and there is potential to integrate this with UPort attestations in the future to further increase the value of this module in the Mentora system.

## Security

Where possible, the conscious decision was made to use existing audited contract libraries (OpenZeppelin) to decrease the possibility of security issues and implement circuit breaker/emergency stop patterns (i.e., Pausable).  Currently, the app does not include payments or transfers, but they will be part of the system at a later time.  Security design patterns are discussed more in the standalone document - [avoiding common attacks](https://github.com/VitalPointAI/Mentora/blob/master/docs/avoiding_common_attacks.md).

## UI/UX

UI/UX has been a major design consideration throughout development as it's likely the largest obstacle to user adoption. We're already asking people to have special extensions installed (MetaMask) to interact with the application.  The barrier to entry is currently too high so future iterations will be looking at ways to streamline the UX for both mentors and mentees.