import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../../util/web3.service';
import { MatSnackBar } from '@angular/material';
import { CommonModule } from '@angular/common';
import { WEB3 } from './../../web3';



declare let require: any;
const vpattribute_artifacts = require('../../../../build/contracts/VPAttribute.json');

@Component({
  selector: 'app-attestation-list',
  templateUrl: './attestation-list.component.html',
  styleUrls: ['./attestation-list.component.css'],
})

export class AttestationListComponent implements OnInit {
    accounts: string[];
    Attestation: any;
    attestationList: number[];
    retrievedAttestations:[];
    issuedAttestations:[] = [];
    events: any[] = [];
    thing: string[];
    accountSubscription: any;
    attestationModel = {
        attesteeId: '',
        attestationId: '',
        attestationDataHash: 0,
        account: ''
    };
  
    status = '';
    change: number;
    currentAccount: number;
    
  
    constructor(
        private web3Service: Web3Service, 
        private matSnackBar: MatSnackBar
        ) {
      console.log('Constructor: ' + web3Service);
    }
  
    ngOnInit(): void {
       
      console.log('OnInit: ' + this.web3Service);
      console.log(this);
      this.watchAccount();
      
      this.web3Service.artifactsToContract(vpattribute_artifacts)
      .then((AttestationAbstraction) => {
      this.Attestation = AttestationAbstraction;
      this.Attestation.deployed().then(deployed => {
          console.log(deployed);
          deployed.AttestationAdded({}, (err, ev) => {
          console.log('Qualification Successfully Added');
          });
      });
      this.getInfo();
      });
      setInterval(() => this.getInfo(), 50000);
    }

    async getInfo() {
        await this.getAllAttestations();  
    }

    async watchAccount() {
      this.web3Service.accountsObservable.subscribe((accounts) => {
        this.accounts = accounts;
        this.attestationModel.account = accounts[0];
        console.log('watch account' + this.attestationModel.account);   
      });
      
    }

    setStatus(status) {
      this.matSnackBar.open(status, null, {duration: 4000});
    }

    async getAttestation(_userAddress)
    {
      
        if(!this.Attestation) {
            this.setStatus('Qualification Component is not loaded, unable to add Qualifications');
            return;
        }

        console.log('Retrieving Qualifications');

        this.setStatus('Initiating Qualification Retrieval... (please wait)');
        try {
            const deployedAttestation = await this.Attestation.deployed();
            this.retrievedAttestations = await deployedAttestation.getAttestation(_userAddress);
            console.log(this.retrievedAttestations);
           
            if(!this.retrievedAttestations)
            {
              this.setStatus('Attestation Retrieval failed!');
            } else {
              this.setStatus('Attestation Retrieval complete!');
            }
          } catch (e) {
            console.log(e);
            this.setStatus('Error with attestation retrieval component; see log.');
          }
    }




    async getIssuedAttestations()
    {
        
        if(!this.Attestation) {
            this.setStatus('Attestation Component is not loaded, unable to add Attestations');
            return;
        }

        console.log('Retrieving Attestations');

        this.setStatus('Initiating Attestation Retrieval... (please wait)');
        try {
            const deployedAttestation = await this.Attestation.deployed();
            this.issuedAttestations = await deployedAttestation.getIssuedAttestations();
          //  this.attestationModel.attesteeId = this.issuedAttestations[0];
            console.log(this.issuedAttestations);
            
            if(!this.issuedAttestations)
            {
              this.setStatus('Attestation Retrieval failed!');
            } else {
              this.setStatus('Attestation Retrieval complete!');
            }
          } catch (e) {
            console.log(e);
            this.setStatus('Error with attestation retrieval component; see log.');
          }
          //return this.issuedAttestations;
    }


    async getAllAttestations()
    {
        this.currentAccount = this.web3Service.currentAcc;
        console.log(this.currentAccount);
       
        if(!this.Attestation) {
            this.setStatus('Qualification Component is not loaded, unable to add Qualifications');
            return;
        }

        console.log('Retrieving Qualifications');
       
        this.setStatus('Initiating Qualification Retrieval... (please wait)');
     //   try {
            const deployedAttestation = await this.Attestation.deployed();
            
            this.events = await deployedAttestation.getPastEvents('AttestationAdded', {
                filter: {attestationCreator: this.currentAccount},
                fromBlock: 0,
                toBlock: 'latest'
            },function(error, events){
            })
            .then(function(events) {
                return events;
            });
        
            console.log(this.events);
          
       /*     if(!this.issuedAttestations)
            {
              this.setStatus('Qualification Retrieval failed!');
            } else {
              this.setStatus('Qualification Retrieval complete!');
            }
          } catch (e) {
            console.log(e);
            this.setStatus('Error with qualification retrieval component; see log.');
          }
        return this.issuedAttestations;
      */  
    }
    
    async getAllEvents() {
        
      //  const log = await this.web3Service.getEventLog();
      //  console.log(log);
    }

    async getEvents() {
        const deployedAttestation = await this.Attestation.deployed();
        deployedAttestation.AttestationAdded ({
        filter: {attestationCreator: this.attestationModel.account}, 
        fromBlock:0
    }, function(error, event) {
        
       // console.log(event);
       // console.log(event.returnValues);
       // this.result.push(event.returnValues);
        const creator = event.returnValues.attestationCreator;
        //console.log(creator);
        const hash = event.returnValues.attestationHash;
        //console.log(hash);
        const thing = [creator, hash]; 
        console.log(thing);
       // return thing;
    })
    .then(data => {return data;});
}
    
}
  