import { LightningElement,wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import SAMPLEMSGCH from'@salesforce/messageChannel/SimpleMessageChannel__c';   
import {APPLICATION_SCOPE, publish, subscribe, unsubscribe, MessageContext} from 'lightning/messageService';

export default class LmsLWC extends LightningElement {
    accountList;
    ratingValue;
    get ratingOptions(){
        return [
            {label: 'Hot' , value : 'Hot'},
            {label: 'Warm' , value : 'Warm'},
            {label: 'Cold' , value : 'Cold'},
        ];
    }

    @wire(MessageContext)
    context;

    handleChange(event){
        this.ratingValue = event.detail.value;
    }

    @wire(getAccountList,{Rating : '$ratingValue'})
    accountHandler({data,error}){
        if(data){
            this.accountList = data;
        }
    }

    handleClick(event){
        console.log('Published');
        const msg = {
            lmsData :{
                value : this.ratingValue
            }
        }
        publish(this.context,SAMPLEMSGCH,msg);
    }
}