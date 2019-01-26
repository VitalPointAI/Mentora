import {Component, OnInit, Inject} from '@angular/core';
import {Web3Service} from './../../../util/web3.service';
import { WEB3 } from './../../../web3';

declare let require: any;
const course_artifacts = require('./../../../../../build/contracts/Course.json');

const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI('localhost', '5001');
const infuraIpfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https'});

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.css']
})
export class DeleteCourseComponent implements OnInit {

    courses:any;
    deployedContract:any;
    deployed:any;
    courseToDelete:number;

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
        private web3Service: Web3Service
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

    async deleteCourse(){
        const accounts = await this.web3.eth.getAccounts();
        this.currentAccount = accounts[0];
        console.log(this.currentAccount);
        this.courseModel.courseOwner = this.currentAccount.toString();
        console.log(this.courseModel.courseOwner);
        const deployed = await this.deployContract();
        console.log(deployed);
       // const deleteCourseInfoUrl = await deleteCourseInfoUrl(this.courseToDelete);
        const courseDeletion = await deployed.burn(this.courseToDelete, {from: this.courseModel.courseOwner});
        console.log(courseDeletion);
    }

    async deployContract() {
        const deployed = await this.courses.deployed();
        return deployed;
    }
/*
    async deleteCourseInfoUrl(courseNumberToDelete):Promise<string> {
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
*/
  setCourseNumber(e) {
    console.log('Setting course number for deletion: ' + e.target.value);
    this.courseToDelete = e.target.value;
}
}
