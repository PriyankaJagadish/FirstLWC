import { LightningElement,api,wire } from 'lwc';
import createComplaint from '@salesforce/apex/ComplaintController.createComplaint';
import { getRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LogComplaint extends LightningElement {
    @api recordId;
    selectedIssue;
    accountName;
    comments;
    resolution;
    isOptionSelected = false;
   
    get issues(){
        return [
            {label: 'Product Issue' , value : 'Product Issue'},
            {label: 'Technician Issue' , value : 'Technician Issue'},
            {label: 'Logistics Issue' , value : 'Logistics Issue'},
        ];
    }

    @wire(getRecord, {recordId: '$recordId', fields: ['Case.AccountId']}) 
    caseDetails({error, data}) {
        if (data) { 
            console.log(data);
            this.accountName = data.fields.AccountId.value;
            console.log(this.accountName);
        }if (error) {
            console.log(error) ;
        }
    }
   
    handleOption(event){
        this.selectedIssue = event.detail.value;
        this.isOptionSelected = true;
    }

    handleChange(event){
        const {name,value} = event.target;

        if(name == "comments"){
            this.comments = value;
        }
    }
    handleCreate(){
        createComplaint({complaintType:this.selectedIssue,comments:this.comments,caseId:this.recordId})
        .then(response=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Log Complaint',
                message: 'Complaint Id : ' + response,
                variant: 'success'
            }))
        })
        .catch(error=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Log Complaint',
                message:  'Sorry! complaint not Logged in!',
                variant: 'error'
            }))
        })
    }
}