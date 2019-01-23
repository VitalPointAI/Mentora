import { WEB3 } from './../../web3';
import { Component, OnInit, Inject } from '@angular/core';
import { ThreeBox } from './../../3box/3box.service';
import * as threeBox from '3box';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    currentaccount: string;
    
    constructor(
        @Inject(WEB3) private web3,
        private threeBoxService: ThreeBox
      ) {}

    ngOnInit(): void {
        console.log('OnInit: ' + this.web3);
        console.log(this);
        this.openAccount();
    }

    async openAccount() {
        const accounts = await this.web3.eth.getAccounts();
        this.currentaccount = accounts[0];
        console.log(this.currentaccount);
        const box = await this.threeBoxService.openBox(this.currentaccount, this.web3.currentProvider);
        console.log(box);
      }
    
    // Open a box and update the current box open in the service
    openBox(address?: string) {
        return this.threeBoxService.openBox(address);
    }

    // Get the profile of an address
    // @param address - the address to get the profile from
    getProfile(address?: string) {
        return this.threeBoxService.getProfile(address)
            .then(profile => console.log(profile));        
    }
    
    // Set a public key in your profile
    setPublicProfile(key: string, value: string) {
        return this.threeBoxService.box.public.set(key, value);
    }

    //display the public profile
    
    
}


    