import { LightningElement,api } from 'lwc';
import insertContact from '@salesforce/apex/ContactController.insertContact';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LwcApexCreateContact extends LightningElement {
    @api recordId;
    mobilePhone;
    lastName;
    errorMessage;

    handlechange(event){
        //Object Destructuring  
        const {name,value} = event.target;

        if(name == "lastName"){
            this.lastName = value;
        }
        if(name == "mobilePhone"){
            this.mobilePhone = value;
        }
    }

    handleCreate(event){
        insertContact({lastName : this.lastName,mobile : this.mobilePhone,recordId :this.recordId})
        .then(response=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Insert Record',
                message: 'Record Id : ' + response,
                variant: 'success'
            }))
        })
        //getting the error message from the error object and displaying the message
        .catch(error=>{
            console.log(error.body.pageErrors[0].message);
            this.errorMessage = error.body.pageErrors[0].message;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Insert Record',
                message:  this.errorMessage,
                variant: 'error'
            }))
        })
    }
}