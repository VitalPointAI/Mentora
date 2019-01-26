import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThreeBox } from './../../../3box/3box.service';
import { WEB3 } from './../../../web3';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-mentor-profile',
  templateUrl: './view-mentor-profile.component.html',
  styleUrls: ['./view-mentor-profile.component.css']
})
export class ViewMentorProfileComponent implements OnInit {

    publicProfileForm: FormGroup;
    submitted = false;
    success = false;
    
    profile:Object;
image: Object;
    
    publicDetailProfileModel = {
        name: '',
        image: '',
        currentAccount: '',
    }

    currentTestName:string;
    clicked: false;

    public ownerId;

  constructor(
    @Inject(WEB3) private web3,
    private threeBoxService: ThreeBox,
    private route: ActivatedRoute,
    private http: HttpClient
   ) {  }

    ngOnInit() { 
        this.publicDetailProfileModel.currentAccount = this.route.snapshot.paramMap.get('id');
        console.log('OnInit: ' + this.web3);
        console.log(this);
        this.openAccount();
    }

    async openAccount() {
        const box = await this.threeBoxService.openBox(this.publicDetailProfileModel.currentAccount, this.web3.currentProvider);
        this.publicDetailProfileModel.name = await this.threeBoxService.box.public.get('name');
        const profileImage = await this.threeBoxService.box.public.get('image');
        if(!profileImage) {
            this.publicDetailProfileModel.image = "/assets/eth.png";
        } else {
        this.publicDetailProfileModel.image = "https://ipfs.infura.io/ipfs/" + profileImage[0]['contentUrl']['/'];
        }
        setInterval(() => this.refreshData(), 100);
    }

  public async refreshData() {
    this.publicDetailProfileModel.name = await this.threeBoxService.box.public.get('name');
    this.currentTestName = await this.threeBoxService.box.public.get('testname');
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
}