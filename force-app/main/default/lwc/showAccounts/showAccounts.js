import { LightningElement } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountController.getAllAccounts'

export default class ShowAccounts extends LightningElement {

    billingCity;
    accountsList;

    handleClick()
    {
        getAllAccounts({billingCity : this.billingCity})
        .then(result=>{
            console.log(result);
            this.accountsList = result;
        })
        .catch(error =>{
            console.log('Error ' + error.body.message);
        })
    }



    handleChange(event)
    {
        this.billingCity = event.target.value;
    }
}