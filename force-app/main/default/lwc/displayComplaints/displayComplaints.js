import { LightningElement,api,wire } from 'lwc';
import getComplaints from '@salesforce/apex/ComplaintController.getComplaints';
export default class DisplayComplaints extends LightningElement {

    @api recordId;
    complaintsList;
    accountName;
    handleClick(event){
        getComplaints({accId : this.recordId})
        .then(result=>{
            this.complaintsList = result;
        })
        .catch(error=>{
            console.log(error);
        })
    }

    @wire(getComplaints,{accId : '$recordId'})
    complaintHandler({data,error}){
        if(data){
            console.log(data);
            this.complaintsList = data;
        }
    }
}