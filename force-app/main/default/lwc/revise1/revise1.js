import { LightningElement,wire } from 'lwc';
import getAccountList1 from '@salesforce/apex/AccountController.getAccountList1';

export default class revise1 extends LightningElement{

    accountsList;
    columnsList = [
        {label:'Id',fieldName:"Id"},
        {label:'Name',fieldName:"Name"},
        {label:'Rating',fieldName:"Rating"}
    ]

    handleClick(){
        getAccountList1
        .then(result=>{
            console.log(result);
            this.accountsList = result;
        })
        .catch(error=>{
            console.log(error);
        })
    }  
    
   // @wire(getAccountList1)
    //accountsList1;
}