var Course = artifacts.require("./Course.sol");

const courseOwner = "0x3d6831e5b18D5eA5196D332154DCc5be803FA21A";
const tokenURI = "http://localhost:8080/ipfs/";
const fixedCourseNumber = 200;


contract('Course', function(accounts) {

    // @title Test#1 - Return Total Number of Courses in Existence
    // @dev confirms that we can get the total number of courses (ERC721 tokens)
    // in existence. This number is used to come up with a unique course number 
    // which gets assigned to a new course in the minting function later on.

    it("should return total number of courses currently in existence", function() {
        return Course.deployed().then(function(instance) {
            return instance.totalSupply();
        }).then(function(result) {
            assert.equal(result, 0, "no courses created yet - should have been zero");
        });
    });

    // @title Test#2 - Get Last Course Number
    // @dev confirms that we can get the last course number so we can use it to create
    // the next course number to assign to a new course.

    it("should return course number of most recently created course", function() {
        return Course.deployed().then(function(instance) {
            let courseAddition = instance.mintWithCourseUri(courseOwner, fixedCourseNumber, tokenURI, {from: accounts[0]})
            .then(function(result) {
                let supply = instance.totalSupply().then(result => {
                    if(result==0) {
                        let previousCourseNumber = 0;
                        return previousCourseNumber;
                    } else {
                        let previousCourseNumber = instance.getLastCourseNumber(result);
                        return previousCourseNumber;
                    }   
                }).then(function(result) {
                    assert.equal(result, 200, "did not get the last course number");
                });
            });
        });
    });

    // @title Test#3 - Create a New Course With Unique Course Number.
    // @dev confirms we can mint a new course (ERC721 token) and assign it a 
    // unique course number.  The first course number is equal to the total number
    // of courses plus 1.  Every course number after the first is equal to the 
    // previous course number plus 1. Ensures that we can deal with a situation 
    // where a course gets deleted.  The course number will always be unique.

    it("should mint a new course with a unique course number", function() {
        const deployed =  Course.deployed().then(function(instance) {
            let courseAdditionTestThree = instance.mintWithCourseUri(courseOwner, fixedCourseNumber, tokenURI, {from: accounts[0]})
            .then(function(result) {
                let supply = instance.totalSupply().then(result => {
                    if(result==0) {
                        let previousCourseNumber = 0;
                        return previousCourseNumber;
                    } else {
                        let previousCourseNumber = instance.getLastCourseNumber(result);
                        return previousCourseNumber;
                    }      
            }).then(function(result) {
                let newCourseNumber = previousCourseNumber + 1;
                let courseAdditionTestThreeB = instance.mintWithCourseUri(courseOwner, newCourseNumber, tokenURI, {from: accounts[0]});
                let totalSupply = instance.totalSupply();
                return courseAdditionTestThreeB, totalSupply, newCourseNumber;
            }).then(function(result){
                assert.isTrue(result.courseAdditionTestThreeB, 'course was not added');
                assert.isAbove(result.totalSupply, 1, 'there should be more than 1 courses');
                assert.equal(result.newCourseNumber, 201, 'new course number is wrong')
            });
            });
            });
    });

    // @title Test#4 - Emit CourseAdded Event on New Course Creation
    // @dev confirms an event is emitted when a new course is added and
    // that we can filter events by courseOwner

    it("should emit CourseAdded event when new course is added", function() {
        const deployed =  Course.deployed().then(function(instance) {
            const courseAdditionTestFour = instance.mintWithCourseUri(courseOwner, fixedCourseNumber, tokenURI, {from: accounts[0]})
            .then(function(instance) {
                const event = instance.getPastEvents('CourseAdded', {
                    filter: {courseOwner: courseOwner},
                    fromBlock: 0,
                    toBlock: 'latest'
                }, function(error, events){
    
                })
                .then(function(events) {
                    return events;
                });
                return events;
            }).then(function(events) {
                assert.exists(events, 'event does not exist');
                assert.equal(events[0]['returnValues'][0], courseOwner, 'did not filter by courseOwner');
            });            
        });
    });

    // @title Test#5 - Returns number of courses owned by a Mentor
    // @dev confirms we can get the balance of courses a mentor has created.

    it("should provide the number of courses a Mentor owns", function() {
        const deployed =  Course.deployed().then(function(instance) {
            const courseAdditionTestFive = instance.mintWithCourseUri(courseOwner, fixedCourseNumber, tokenURI, {from: accounts[0]})
            .then(function(instance) {
                return balance = instance.balanceOf(courseOwner);
            }).then(function(balance) {
                assert.equal(balance, 1, 'there should have been 1 course attributed to that user');
            });            
        });
    });
});
