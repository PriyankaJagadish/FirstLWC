import { LightningElement,wire } from 'lwc';
import getAccountList1 from '@salesforce/apex/AccountController.getAccountList1'

export default class Revise extends LightningElement {
    accountsList;

    handleClick(event){
        getAccountList1
        .then(result=>{
            this.accountsList = result;
        })
        .catch(error=>{
            console.log(error);
        })
    }

    @wire(getAccountList1)
    accountHandler(data,error){
        if(data){
            this.accountsList = data;
        }
        if(error){
            console.log(error);
        }
    }
}