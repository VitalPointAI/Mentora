import { Pipe, PipeTransform } from '@angular/core';
import {Web3Service} from './util/web3.service';

@Pipe({
  name: 'useraccount'
})
export class UseraccountPipe implements PipeTransform {
    
    account: any;

    constructor(private web3Service: Web3Service) {}

    transform(value:any, args?: any): any {
        
     const accounts = this.web3Service.accountsObservable.subscribe((accounts) => {
        this.account = accounts[0];
    });
    if(!value) return [];
    
    return value.filter((issuedAttestations) => issuedAttestations.attesteeId==this.account);
  }

}
