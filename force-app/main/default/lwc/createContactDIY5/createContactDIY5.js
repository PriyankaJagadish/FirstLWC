import { LightningElement,api } from 'lwc';
import createContact from '@salesforce/apex/ContactController.createContact';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateContactDIY5 extends LightningElement {
    @api recordId;
    lastName;
    firstName;
    dept;
    bDate;
    email;
    errorMessage;

    handlechange(event){
        const {name,value} = event.target;

        if(name == "firstName"){
            this.firstName = value;
        }
        if(name == "lastName"){
            this.lastName = value;
        }
        if(name == "bdate"){
            this.bDate = value;
        }
        if(name == "email"){
            this.email = value;
        }
        if(name == "dept"){
            this.dept = value;
        }
    }

    handleCreate(event){
        createContact({fName : this.firstName,
                       lName : this.lastName,
                       bDate : this.bDate,
                       email : this.email,
                       dept : this.dept,
                       recordId :this.recordId})
        .then(response=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Create Contact',
                message: 'Record Id : ' + response,
                variant: 'success'
            }))
        })
        //getting the error message from the error object and displaying the message
        .catch(error=>{
            console.log(error);
            console.log(error.body.pageErrors[0].message);
            this.errorMessage = error.body.pageErrors[0].message;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Create Contact',
                message:  this.errorMessage,
                variant: 'error'
            }))
        })
    }
}