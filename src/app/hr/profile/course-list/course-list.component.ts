import {Component, OnInit, Inject} from '@angular/core';
import { Web3Service } from '../../../util/web3.service';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../../../util/data.service';
import { HttpClient } from '@angular/common/http';
import { WEB3 } from './../../../web3';


declare let require: any;
const course_artifacts = require('./../../../../../build/contracts/Course.json');

const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI('localhost', '5001');

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

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

    events: any = [];
    accounts: any;
    results:[];
    currentAccount: string;

    data: any = [];
    receivedData: [];

    constructor(@Inject(WEB3) private web3,
        private web3Service: Web3Service,
        private matSnackBar: MatSnackBar,
        private dataService: DataService
    ) { }  

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
        this.getInfo();
       
      });
      setInterval(() => this.getInfo(), 50000);
    }

    getData(hash) {
        this.data = [];
        this.dataService.getData(hash).subscribe((data: {}) => {
            console.log(data);
           this.data.push(data);
       
       console.log(this.data);
        });
    }

    async getInfo() {
        await this.getUserCourses();  
    }

    setStatus(status) {
        this.matSnackBar.open(status, null, {duration: 4000});
    }

    async getUserCourses()
    {
        const accounts = await this.web3.eth.getAccounts();
        this.currentAccount = accounts[0];
        console.log(this.currentAccount);
       
        if(!this.courses) {
            this.setStatus('Courses Component is not loaded.');
            return;
        }

        console.log('Retrieving Courses');
       
        this.setStatus('Initiating Courses Retrieval... (please wait)');
     
        const deployedCourses = await this.courses.deployed();
        
        this.results = await deployedCourses.getPastEvents('CourseAdded', {
            filter: {courseOwner: this.currentAccount},
            fromBlock: 0,
            toBlock: 'latest'
        },function(error, events){
        //    console.log(events);
        }).then(function(events){
           console.log(events);
           return events;
        });
        
        for(var i=0;i<this.results.length;i++) {
        //    console.log(this.results[i].returnValues[2]);
        console.log(this.results[i]['returnValues'][2]);
        await this.getData(this.results[i]['returnValues'][2]);
        }
      //  console.log(receivedData);
        console.log(this.data);
      //  console.log(this.events);
       //let receivedData=[];
       // let hash = this.events.returnValues[2];
       // this.getData(hash);
       //receivedData.push(await this.getData(this.events));
       
        
        
       // let courseUrl = this.events[0].returnValues[2];
      //  console.log(courseUrl);
        
        
        
    }
}
