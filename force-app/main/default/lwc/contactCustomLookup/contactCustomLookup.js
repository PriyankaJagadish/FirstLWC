import { LightningElement,wire,track } from 'lwc';
import getAccountAddress from '@salesforce/apex/AccountController.getAccountAddress';

export default class ContactCustomLookup extends LightningElement {
    @track accAddress;
    accId;

    handleChange(event){
      this.accId = event.target.value;  
    }

    @wire(getAccountAddress,{accId:'$accId'})
    getAddress(result){
        const{data,error} = result;
        if(data){
            this.accAddress=result.data[0].BillingStreet;
            console.log(this.accAddress);
        }
        if(error){
            console.log(error);
        }
    }
}