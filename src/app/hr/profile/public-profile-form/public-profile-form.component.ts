import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThreeBox } from './../../../3box/3box.service';
import { WEB3 } from './../../../web3';

@Component({
  selector: 'app-public-profile-form',
  templateUrl: './public-profile-form.component.html',
  styleUrls: ['./public-profile-form.component.css']
})
export class PublicProfileFormComponent implements OnInit {

    publicProfileForm: FormGroup;
    submitted = false;
    success = false;
    
    profile:Object;
image: Object;
    
    publicProfileModel = {
        name: '',
        image: '',
        currentAccount: '',
    }

    currentTestName:string;
    clicked: boolean;


  constructor(
    @Inject(WEB3) private web3,
    private threeBoxService: ThreeBox
   ) {  }

    ngOnInit() {   
        console.log('OnInit: ' + this.web3);
        console.log(this);
        this.openAccount();
    }

    async openAccount() {
        const accounts = await this.web3.eth.getAccounts();
        this.publicProfileModel.currentAccount = accounts[0];
        console.log(this.publicProfileModel.currentAccount);
        const box = await this.threeBoxService.openBox(this.publicProfileModel.currentAccount, this.web3.currentProvider);
        this.publicProfileModel.name = await this.threeBoxService.box.public.get('name');
        const profileImage = await this.threeBoxService.box.public.get('image');
        if(!profileImage) {
            this.publicProfileModel.image = "/assets/eth.png";
        } else {
        this.publicProfileModel.image = "https://ipfs.infura.io/ipfs/" + profileImage[0]['contentUrl']['/'];
        }
        setInterval(() => this.refreshData(), 100);
    }

  public async refreshData() {
    this.publicProfileModel.name = await this.threeBoxService.box.public.get('name');
    this.currentTestName = await this.threeBoxService.box.public.get('testname');
  }

    // Open a box and update the current box open in the service
    openBox(address?: string) {
        return this.threeBoxService.openBox(address);
    }

    // Set a public key in your profile
    setPublicProfile(key: string, value: string) {
        this.clicked=false;
        return this.threeBoxService.box.public.set(key, value)
}
 // Get the profile of an address
    // @param address - the address to get the profile from
    getProfile(address?: string) {
        return this.threeBoxService.getProfile(address)
            .then(profile => console.log(profile));
    }

    updateName(e) {
        console.log('Updating Public Profile Name: ' + e.target.value);
        this.publicProfileModel.name = e.target.value;
      }
}
