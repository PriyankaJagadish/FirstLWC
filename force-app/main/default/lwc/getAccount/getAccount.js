import { LightningElement,wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

export default class GetAccount extends LightningElement {
    accountList;
    ratingValue;
    get ratingOptions(){
        return [
            {label: 'Hot' , value : 'Hot'},
            {label: 'Warm' , value : 'Warm'},
            {label: 'Cold' , value : 'Cold'},
        ];
    }

    handleChange(event){
        this.ratingValue = event.detail.value;
    }

    @wire(getAccountList,{Rating : '$ratingValue'})
    accountHandler({data,error}){
        if(data){
            this.accountList = data;
        }
    }
}