import {Component, OnInit, Inject} from '@angular/core';
import {Web3Service} from './../../../util/web3.service';
import { WEB3 } from './../../../web3';
import { ThreeBox } from './../../../3box/3box.service';

declare let require: any;
const course_artifacts = require('./../../../../../build/contracts/Course.json');

const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI('localhost', '5001');
const infuraIpfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https'});

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

    courses:any;
    deployedContract:any;
    deployed:any;

    courseModel = {
        courseTitle: '',
        courseDescription: '',
        courseNumber: 0,
        courseOwner: '',
        courseInfoUrl: '',
        course3BoxName: ''
    }

    currentAccount: any;

    constructor(@Inject(WEB3) private web3,
        private web3Service: Web3Service,
        private threeBoxService: ThreeBox
    ) { }

    ngOnInit() {
        console.log(this);
        
        const network = this.web3.eth.net.getId().then(console.log);

        if (network=='5777') {
        //Connect with IPFS node
        ipfs.id(function(err, res) {
            if (err) throw err
            console.log('Connected to IPFS node!', res.id, res.agentVersion, res.protocolVersion);
            });
        } else {
        infuraIpfs.id(function(err, res) {
            if (err) throw err
            console.log('Connected to IPFS node!', res.id, res.agentVersion, res.protocolVersion);
            });
        }
        //Get access to courses contract methods
        this.web3Service.artifactsToContract(course_artifacts)
        .then((courseAbstraction) => {
        this.courses = courseAbstraction;
        this.courses.deployed().then(deployed => {
          this.deployedContract = deployed;
          console.log(this.deployedContract);
        });
        
      });
    }

    async createCourse(courseTitle, courseDescription) {
       const accounts = await this.web3.eth.getAccounts();
       this.currentAccount = accounts[0];
       this.courseModel.courseOwner = this.currentAccount.toString();
       this.courseModel.courseTitle = courseTitle;
       console.log(this.courseModel.courseTitle);
       this.courseModel.courseDescription = courseDescription;
       console.log(this.courseModel.courseDescription);
       this.courseModel.course3BoxName = await this.get3BoxName(this.courseModel.courseOwner);
       console.log(this.courseModel.course3BoxName);
       this.courseModel.courseNumber  = await this.getLastCourseNumber();
       console.log(this.courseModel.courseNumber);
       this.courseModel.courseNumber++;
       this.courseModel.courseInfoUrl = await this.createCourseInfoUrl(
           this.courseModel.courseTitle, 
           this.courseModel.courseDescription, 
           this.courseModel.courseOwner, 
           this.courseModel.course3BoxName, 
           this.courseModel.courseNumber
        );
        console.log(this.courseModel.courseInfoUrl);        
        this.courseAddition();
        
    }

    async courseAddition(){
        const accounts = await this.web3.eth.getAccounts();
        this.currentAccount = accounts[0];
        console.log(this.currentAccount);
        this.courseModel.courseOwner = this.currentAccount.toString();
        console.log(this.courseModel.courseOwner);
        const deployed = await this.deployContract();
        console.log(deployed);
        const courseAddition = await deployed.mintWithCourseUri(this.courseModel.courseOwner, this.courseModel.courseNumber, this.courseModel.courseInfoUrl, {from: this.courseModel.courseOwner});
        console.log(courseAddition);
    }

    async get3BoxName(address) {
        const box = await this.threeBoxService.openBox(address, this.web3.currentProvider);
        const result = await this.threeBoxService.box.public.get('name');
        return result;
    }

    async deployContract() {
        const deployed = await this.courses.deployed();
        return deployed;
    }

    async getLastCourseNumber() {
        const accounts = await this.web3.eth.getAccounts();
        console.log(accounts);
        const deployed = await this.deployContract();
        console.log(deployed);
        let supply = await deployed.totalSupply();
        supply = supply.toNumber();
        if(supply == 0) {
            const previousCourseNumber = 0;
            return previousCourseNumber;
        } else {
            const previousCourseNumber = await deployed.getLastCourseNumber(supply);
            console.log(previousCourseNumber);
            return previousCourseNumber;
        }  
    }

    async createCourseInfoUrl(courseTitle, courseDescription, courseOwner, course3BoxName, courseNumber):Promise<string> {
        var courseJson = {
            courseTitle: courseTitle,
            courseDescription: courseDescription,
            courseOwner: courseOwner,
            course3BoxName: course3BoxName,
            courseNumber: courseNumber
        }
        console.log(courseJson);
        const network = this.web3.eth.net.getId().then(console.log);

        if (network=='5777') {
            const ipfsEndPoint = "http://localhost:8080/ipfs";
            let content = ipfs.types.Buffer.from(JSON.stringify(courseJson));
            let results = await ipfs.add(content);
            let hash = results[0].hash;
            console.log('creating course:', courseJson.courseTitle, hash);
            return (ipfsEndPoint + hash);
        } else {
            const ipfsEndPoint = "https://ipfs.infura.io/ipfs/";
            let content = infuraIpfs.types.Buffer.from(JSON.stringify(courseJson));
            let results = await infuraIpfs.add(content);
            let hash = results[0].hash;
            console.log('creating course:', courseJson.courseTitle, hash);
            return (ipfsEndPoint + hash);
        }
    }

    //FORM CONTROLS

    setCourseTitle(e) {
        console.log('Setting course title: ' + e.target.value);
        this.courseModel.courseTitle = e.target.value;
    }
    setCourseDescription(e) {
        console.log('Setting course description: ' + e.target.value);
        this.courseModel.courseDescription = e.target.value;
    }


}
