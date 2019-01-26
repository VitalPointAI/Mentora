import {Component, OnInit} from '@angular/core';
import {Web3Service} from './../util/web3.service';
import { MatSnackBar } from '@angular/material';
import { CommonModule } from '@angular/common';


declare let require: any;
const positions_artifacts = require('./../../../build/contracts/Position.json');

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    accounts:string[];
    currentAccount:number;
    positions: any;
    accountSubscription: any;
    totalSupply:number;
    name: string;
    symbol: string;
    deployedContract: any;
    balanceOf: number;
    ownerOf: number;
    events: any;

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
      this.getInfo();
      
    });
    setInterval(() => this.getInfo(), 50000);
    
  }

  async getInfo() {
      await this.getName();
     // await this.getSymbol();
      await this.getCurrentAccountBalanceOfPositions();
    //  await this.getAllPositionsOwnedByCurrentAccount();
  }

  

  async getName() {
    await this.positions.deployed();
    this.name = await this.deployedContract.name();
  }

  async getSymbol() {
    await this.positions.deployed();
    this.symbol = await this.deployedContract.symbol();
  }

  async getCurrentAccountBalanceOfPositions() {
      this.currentAccount = await this.web3Service.currentAcc;
      await this.positions.deployed();
      this.balanceOf = await this.deployedContract.balanceOf(this.currentAccount);
  }

  async getAllPositionsOwnedByCurrentAccount() {
    await this.positions.deployed();
    this.events = await this.deployedContract.getPastEvents('PositionAdded', {
        filter: {positionOwner: this.currentAccount},
        fromBlock: 0,
        toBlock: 'latest'
    },function(error, events){
    //    console.log(events);
    })
    .then(function(events) {
     //   console.log(events);
        return events;
        
    });

    console.log(this.events);
  }

  


  
  

    
}
