import { Component, OnInit, Inject } from '@angular/core';
import { Web3Service } from '../../../util/web3.service';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../../../util/data.service';
import { WEB3 } from './../../../web3';
import { Router } from '@angular/router';

declare let require: any;
const course_artifacts = require('./../../../../../build/contracts/Course.json');

const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI('localhost', '5001');

@Component({
  selector: 'app-courses-dashboard',
  templateUrl: './courses-dashboard.component.html',
  styleUrls: ['./courses-dashboard.component.css']
})
export class CoursesDashboardComponent implements OnInit {

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

    allCourses: any = [];
    accounts: any;
    results:[];
    currentAccount: string;

    data: any = [];
    receivedData: [];
    totalNumberOfCourses: number;

    constructor(@Inject(WEB3) private web3,
        private web3Service: Web3Service,
        private matSnackBar: MatSnackBar,
        private dataService: DataService,
        private router: Router
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
        this.getTotalSupply();
       
      });
      setInterval(() => this.getInfo(), 50000);
    }
    onSelect(item){
        console.log(item.courseOwner);
        this.router.navigate(['/profile', item.courseOwner]);
    }

    getData(hash) {
        this.data = [];
        this.dataService.getData(hash).subscribe((data: {}) => {
            console.log(data);
           this.data.push(data);
       
       console.log(this.data);
        });
    }

    async getTotalSupply() {
        await this.courses.deployed();
        let result = await this.deployedContract.totalSupply();
        this.totalNumberOfCourses = result.toNumber();
    }

    async getInfo() {
        await this.getAllCourses();  
    }

    setStatus(status) {
        this.matSnackBar.open(status, null, {duration: 4000});
    }

    async deployContract() {
        let deployed;
        deployed = await this.courses.deployed();
        return deployed;
    }

    async getAllCourses()
    {
        const accounts = await this.web3.eth.getAccounts();
        this.currentAccount = accounts[0];
        console.log(this.currentAccount);
       
        if(!this.courses) {
            this.setStatus('Courses Component is not loaded.');
            return;
        }

        console.log('Retrieving All Courses');
       
        this.setStatus('Initiating All Courses Retrieval... (please wait)');
        let deployed = await this.deployContract();
        this.results = await deployed.getPastEvents('CourseAdded', {
            filter: {},
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
        console.log(this.data);        
    }
}