import { LightningElement,api,wire } from 'lwc';
import createComplaint from '@salesforce/apex/ComplaintController.createComplaint';
import updateResolution from '@salesforce/apex/ComplaintController.updateResolution';
import getComplaints from '@salesforce/apex/ComplaintController.getComplaints';
import getCaseOnAccount from '@salesforce/apex/CaseController.getCaseOnAccount';
import getCommentsOnComplaint from '@salesforce/apex/ComplaintController.getCommentsOnComplaint';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';
import logComplaint from './logComplaintOnAccount.html';
import provideResolution from './provideResolution.html';
import mainTemplate from './mainTemplate.html';


export default class LogComplaintOnAccount extends LightningElement {
    @api recordId;
    caseOptions = [];
    selectedCase;
    selectedIssue;
    comments;
    resolution;
    userInput = '';
    selectedComplaint;
   
    get issues(){
        return [
            {label: 'Product Issue' , value : 'Product Issue'},
            {label: 'Technician Issue' , value : 'Technician Issue'},
            {label: 'Logistics Issue' , value : 'Logistics Issue'},
        ];
    }

    //Get List of Complaints
    @wire(getComplaints,{accId : '$recordId'})
    complaintHandler({data,error}){
        if(data){
            console.log(data);
            this.complaintsList = data.map(record=>({
                value: record.Id, label: record.Name
            }));
        }
        if(error){
            this.complaintsList = [];
            console.log(error);
        }
    }

    //Get List Of Cases
    @wire(getCaseOnAccount,{recId : '$recordId'})
    caseHandler({data,error}){
        if(data){
            console.log(this.recordId);
            console.log(data);
            this.caseOptions = data.map(record=>({
                value: record.Id, label: record.CaseNumber
            }));
        }
        if(error){
            this.caseOptions = [];
            console.log(error);
        }
    }

    //Get Comments on ComplaintId
    @wire(getCommentsOnComplaint,{complaintId : '$selectedComplaint'})
    commentHandler({data,error}){
        if(data){
            console.log(data[0]);
            console.log(data[0].Comments__c);
            this.comments = data[0].Comments__c;
        }
        if(error){
            console.log(error);
        }
    }

    handleClick(event){
        this.userInput = event.target.label;
    }
    render(){
        return this.userInput === "Log Complaint" ? logComplaint : this.userInput === "Resolution" ? provideResolution : mainTemplate ;
    }
    handleBack(){
        this.userInput = '';
    }

    handleCaseChange(event){
        this.selectedCase = event.detail.value;
        console.log(this.selectedCase);
    }
    handleOption(event){
        this.selectedIssue = event.detail.value;
    }
    handleComplaint(event){
        this.selectedComplaint = event.detail.value;
    }
    handleChange(event){
        const {name,value} = event.target;

        if(name == "comments"){
            this.comments = value;
        }
        if(name == "resolution"){
            this.resolution = value;
        }

    }
    handleCreate(){
        createComplaint({complaintType:this.selectedIssue,comments:this.comments,caseId:this.selectedCase})
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
        this.clearFields();
    }

    handleUpdate(){
        updateResolution({caseId:this.selectedCase,resolution:this.resolution,complaintId:this.selectedComplaint})
        .then(response=>{
            console.log(response);
            this.dispatchEvent(new ShowToastEvent({
                title: 'Update Complaint',
                message: 'Complaint Updated Successfully!',
                variant: 'success'
            }))   
        })
        .catch(error=>{
            console.log(error);
            this.dispatchEvent(new ShowToastEvent({
                title: 'Update Complaint',
                message:  'Sorry! Complaint not updated!',
                variant: 'error'
            }))
        })
        this.clearFields();
    }

    clearFields(){
        this.selectedCase = '';
        this.selectedIssue = '';
        this.comments = '';
        this.resolution = '';  
    }
}