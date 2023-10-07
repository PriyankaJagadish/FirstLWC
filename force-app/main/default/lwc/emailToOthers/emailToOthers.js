import { LightningElement,wire } from 'lwc';
import Id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import sendEmail from '@salesforce/apex/EmailController.sendEmail';
import getOrgEmail from '@salesforce/apex/EmailController.getOrgEmail';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EmailToOthers extends LightningElement {

    userEmail;
    orgEmail;
    selectedEmail;
    toEmail;
    subject;
    message;
    errorMessage;

    get fromEmail(){
        return [
            {label: 'User Email' , value : this.userEmail},
            {label: 'Org Wide Email' , value : 'Org Wide Email'},
        ];
    }

    handleOption(event){
        this.selectedEmail = event.detail.value;
        console.log(this.selectedEmail);
    }

    handleChange(event){
        const {name,value} = event.target;

        if(name == "toEmail"){
            this.toEmail = value;
        }
        if(name == "subject"){
            this.subject = value;
        }
        if(name == "body"){
            this.message = value;
        }
    }

    @wire(getRecord, {recordId: Id, fields: ['User.Email']}) 
    userDetails({error, data}) {
        if (data) { 
            this.userEmail = data.fields.Email.value;
        }if (error) {
            console.log(error) ;
        }
    }

    /*@wire(getOrgEmail)
    orgEmailAddress({data,error}){
        if(data){
            this.orgEmail = data.Address;
        }
        if(error){
            console.log(error);
        }
    }*/

    sendEmail(){
        sendEmail({fromAddress: this.selectedEmail,toAddress : this.toEmail, subject : this.subject, body : this.message})
        .then(response=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Email',
                message: 'Email Sent Successfully!',
                variant: 'success'
            }))
            //this.clearFields();
        })
        .catch(error=>{
            console.log(error.body.message);
            this.errorMessage = error.body.message;
            this.dispatchEvent(new ShowToastEvent({     
                title: 'Email',
                message: this.errorMessage,
                variant: 'error'
            }))
        })
    }
    clearFields(){
        this.toEmail = '';
        this.subject = '';
        this.message = '';
        this.fromEmail = '';
    }
}