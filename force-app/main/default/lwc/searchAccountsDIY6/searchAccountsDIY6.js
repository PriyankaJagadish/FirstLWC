import { LightningElement } from 'lwc';
import searchAccount from '@salesforce/apex/AccountController.searchAccount';

export default class SearchAccountsDIY6 extends LightningElement {
searchText;
accountsList;
isAccounts = false;

columnsList = [
    {label: 'Id', fieldName : "Id"},
    {label: 'Name', fieldName : "Name"},
    {label: 'Account Number', fieldName : "AccountNumber"},
    {label: 'Billing State', fieldName : "BillingState"}
];

    handleChange(event){
        this.searchText = event.target.value;
    }

    handleClick(){
        searchAccount({accName : this.searchText})
        .then(response=>{   
            if(response.length > 0){
                this.accountsList = response;
                this.isAccounts = true;
            }
            else{
                this.isAccounts = false;
                this.accountsList = '';
            }
        })
        
        .catch(error =>{
            console.log('Error ' + error.body.message);
        })

        this.accountsList = '';
    }
}