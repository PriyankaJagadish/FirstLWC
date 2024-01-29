import { LightningElement,wire } from 'lwc';
import getAccountList1 from '@salesforce/apex/AccountController.getAccountList1';

export default class Revise extends LightningElement {
    accountsList;
  
    handleClick(){
        getAccountList1
        .then(result=>{
            this.accountsList = result;
            console.log(this.accountsList);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    //@wire(getAccountList1)
   // accountsList1;
    
    /*accountHandler(data,error){
        if(data){
            this.accountsList1 = data;
            console.log(this.accountsList1);
        }
        if(error){
            console.log(error);
        }
    }*/
}