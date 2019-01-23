import {Component, OnInit} from '@angular/core';
import {Web3Service} from './../../../util/web3.service';


declare let require: any;
const positions_artifacts = require('./../../../../../build/contracts/Position.json');

@Component({
  selector: 'app-position-owner',
  templateUrl: './position-owner.component.html',
  styleUrls: ['./position-owner.component.css']
})
export class PositionOwnerComponent implements OnInit {
    accounts: any;
    positions:any;
    deployedContract:any;
    deployed:any;
    positionModel = {
        positionNumber: 0,
        positionTitle: '',
        positionOwner: ''
    }

    currentAccount: any;
    ownerOf: number;

    constructor(private web3Service: Web3Service) { }

    ngOnInit() {
        console.log(this);
       this.watchAccount();
        this.web3Service.artifactsToContract(positions_artifacts)
        .then((positionAbstraction) => {
        this.positions = positionAbstraction;
        this.positions.deployed().then(deployed => {
          this.deployedContract = deployed;
          console.log(this.deployedContract);
        });
        
      });
    }

    async watchAccount() {
        this.web3Service.accountsObservable.subscribe((accounts) => {
          this.accounts = accounts;
          this.currentAccount = accounts[0];
          console.log('watch account' + this.currentAccount);   
        });
        
      }

    async getOwnerOfPosition(_positionId) {
        await this.positions.deployed();
        this.ownerOf = await this.deployedContract.ownerOf(_positionId);
    }


    //FORM CONTROLS
    setPositionNumber(e) {
        console.log('Setting position number: ' + e.target.value);
        this.positionModel.positionNumber = e.target.value;
    }
}
