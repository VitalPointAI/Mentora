import {Component, OnInit} from '@angular/core';
import {Web3Service} from './../../../util/web3.service';


declare let require: any;
const positions_artifacts = require('./../../../../../build/contracts/Position.json');

@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.css']
})
export class CreatePositionComponent implements OnInit {

    positions:any;
    deployedContract:any;
    deployed:any;
    positionModel = {
        positionNumber: 0,
        positionTitle: '',
        positionOwner: ''
    }

    currentAccount: any;

    constructor(private web3Service: Web3Service) { }

    ngOnInit() {
        console.log(this);
       
        this.web3Service.artifactsToContract(positions_artifacts)
        .then((positionAbstraction) => {
        this.positions = positionAbstraction;
        this.positions.deployed().then(deployed => {
          this.deployedContract = deployed;
          console.log(this.deployedContract);
        });
        
      });
    }

    async createPosition(positionNumber, positionOwner) {
        this.currentAccount = this.web3Service.currentAcc;
        const deployed = await this.positions.deployed();
        const positionAddition = await this.deployedContract.mintnft.sendTransaction(positionNumber, positionOwner, {from: this.currentAccount});
        console.log(positionAddition);
    }

    //FORM CONTROLS

    setPositionNumber(e) {
        console.log('Setting position number: ' + e.target.value);
        this.positionModel.positionNumber = e.target.value;
    }
    setPositionOwner(e) {
        console.log('Setting position owner: ' + e.target.value);
        this.positionModel.positionOwner = e.target.value;
    }
}
