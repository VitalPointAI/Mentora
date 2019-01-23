import {Component, OnInit, Inject} from '@angular/core';
import {Web3Service} from './../../../util/web3.service';
import { WEB3 } from './../../../web3';


declare let require: any;
const course_artifacts = require('./../../../../../build/contracts/Course.json');

const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI('localhost', '5001');

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
        courseInfoUrl: ''
    }

    currentAccount: any;

    constructor(@Inject(WEB3) private web3,
        private web3Service: Web3Service) { }

    ngOnInit() {
        console.log(this);
        
        //Connect with IPFS node
        ipfs.id(function(err, res) {
            if (err) throw err
            console.log('Connected to IPFS node!', res.id, res.agentVersion, res.protocolVersion);
            });
        
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
       this.courseModel.courseTitle = courseTitle;
       console.log(this.courseModel.courseTitle);
       this.courseModel.courseDescription = courseDescription;
       console.log(this.courseModel.courseDescription);
       this.courseModel.courseInfoUrl = await this.createCourseInfoUrl(this.courseModel.courseTitle, this.courseModel.courseDescription);
        console.log(this.courseModel.courseInfoUrl);        
        this.courseAddition();
        
    }

    async courseAddition(){
        this.currentAccount = this.web3Service.currentAcc;
        console.log(this.currentAccount);
        this.courseModel.courseOwner = this.currentAccount.toString();
        console.log(this.courseModel.courseOwner);
        let deployed = await this.deployContract();
        console.log(deployed);
        let totalSupply = await deployed.totalSupply();
        console.log(totalSupply.toNumber());
        this.courseModel.courseNumber = totalSupply + 1;
        const courseAddition = await deployed.mintWithCourseUri(this.courseModel.courseOwner, this.courseModel.courseNumber, this.courseModel.courseInfoUrl, {from: this.courseModel.courseOwner});
        console.log(courseAddition);
    }

    async deployContract() {
        let deployed;
        deployed = await this.courses.deployed();
        return deployed;
    }

    async createCourseInfoUrl(courseTitle, courseDescription):Promise<string> {
        var courseJson = {
            courseTitle: courseTitle,
            courseDescription: courseDescription
        }
        console.log(courseJson);
        let content = ipfs.types.Buffer.from(JSON.stringify(courseJson));
        let results = await ipfs.add(content);
        let hash = results[0].hash;
        console.log('creating course:', courseJson.courseTitle, hash);
        return ("http://localhost:8080/ipfs/" + hash);
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
