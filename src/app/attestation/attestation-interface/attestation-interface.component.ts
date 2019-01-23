import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../../util/web3.service';
import { MatSnackBar, MatToolbar } from '@angular/material';

declare let require: any;
const vpattribute_artifacts = require('../../../../build/contracts/VPAttribute.json');

@Component({
  selector: 'app-attestation-interface',
  templateUrl: './attestation-interface.component.html',
  styleUrls: ['./attestation-interface.component.css']
})
export class AttestationComponent implements OnInit {
  accounts: string[];
  Attestation: any;

  attestationModel = {
      attesteeId: 0,
      attestationId: '',
      attestationDataHash: 0,
      account: ''
  };

  status = '';
  currentAccount = 0

  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) {
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
    });
  }

 
  async watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.attestationModel.account = accounts[0];
    });
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 4000});
  }

  async addAttestation(
      _attesteeId:number, 
      _attestationId:string,
      _attestationDataHash:number
      )
      {
        this.currentAccount = this.web3Service.currentAcc;
          if(!this.Attestation) {
              this.setStatus('Attestation Component is not loaded, unable to add Attestations');
              return;
          }

          const attesteeId = _attesteeId;
          const attestationId = _attestationId;
          const attestationDataHash = _attestationDataHash;

          console.log('Adding Attestation');

          this.setStatus('Initiating Attestation Addition... (please wait)');
          try {
              const deployedAttestation = await this.Attestation.deployed();
              const addition = await deployedAttestation.addAttestation.sendTransaction(attesteeId, attestationId, attestationDataHash, {from: this.currentAccount});

              if(!addition)
              {
                this.setStatus('Attestation Addition failed!');
              } else {
                this.setStatus('Attestation Addition complete!');
              }
            } catch (e) {
              console.log(e);
              this.setStatus('Error with attestation component; see log.');
            }
        }
      

 async verifyAttestation(
    _attesteeId:number, 
    _attestationId:string,
    _attestationDataHash:number
 ) {
    
    const attesteeId = _attesteeId;
    const attestationId = _attestationId;
    const attestationDataHash = _attestationDataHash;

    console.log('Verifying Attestation');

    this.setStatus('Initiating Attestation Verification... (please wait)');
    try {
        const deployedAttestation = await this.Attestation.deployed();
        const verification = await deployedAttestation.verifyAttestation.sendTransaction(attesteeId, attestationId, attestationDataHash, {from: this.attestationModel.account});
    

        if(!verification)
        {
            this.setStatus('Verification failed!');
        } else {
            this.setStatus('Verification complete!');
        }
    } catch (e) {
    console.log(e);
    this.setStatus('Error verifying attestation; see log.');
    }

 }

  setAttesteeId(e) {
    console.log('Setting attesteeId number: ' + e.target.value);
    this.attestationModel.attesteeId = e.target.value;
  }

  setAttestationId(e) {
    console.log('Setting attestation Id: ' + e.target.value);
    this.attestationModel.attestationId = e.target.value;
  }

  setAttestationDataHash(e) {
    console.log('Setting attestationDataHash: ' + e.target.value);
    this.attestationModel.attestationDataHash = e.target.value;
  }

  

}
