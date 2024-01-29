import { LightningElement,api,wire } from 'lwc';
import getReceipts from '@salesforce/apex/ReceiptController.getReceipts';
import { createRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';

export default class CreateReceiptDIY7 extends LightningElement {
@api recordId;
amount;
modeOfPay;
date;
showModal = false;
errorMessage;

columnsList = [
    {label: 'Name', fieldName : "Name"},
    {label: 'Contact', fieldName : "Contact__c"},
    {label: 'Amount', fieldName : "Amount__c"}
];
receiptsList;
wiredResponse;

@wire(getReceipts,{conId : '$recordId'})
receipts(response){
    this.wiredResponse = response;
    if(response.data){
        this.receiptsList = response.data;
    }
}

    handleChange(event){
        const {name,value} = event.target;

        if(name == "amount"){
            this.amount = value;
        }
        if(name == "mode"){
            this.modeOfPay = value;
        }
        if(name == "date"){
            this.date = value;
        }
    }

    openModal(){
        this.showModal = true;
    }

    createReceipt(){
        const fields = {'Contact__c' : this.recordId,'Amount__c' : this.amount,'Amount_Paid_Date__c' : this.date,'Mode_Of_Pay__c' : this.modeOfPay};
        createRecord({apiName:'Receipt__c',fields})
        .then(response=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Create Receipt',
                message: 'Record Id : ' + response.id,
                variant: 'success'
            }))
            //fields = {};
            refreshApex(this.wiredResponse);
        })
        //getting the error message from the error object and displaying the message
        .catch(error=>{
            console.log(error.body.pageErrors[0].message);
            this.errorMessage = error.body.pageErrors[0].message;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Create Receipt',
                message:  this.errorMessage,
                variant: 'error'
            }))
        })
        this.showModal = false;
    }

    closeModal(){
        this.showModal = false;
    }
}