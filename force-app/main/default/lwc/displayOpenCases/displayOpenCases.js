import { LightningElement,wire } from 'lwc';
import getOpenCases from '@salesforce/apex/CaseController.getOpenCases';
import { updateRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';

export default class DisplayOpenCases extends LightningElement {
    wiredResponse;
    caseRecords;
    columns = [
        {label:'Subject',fieldName:'Subject'},
        {label:'Case Owner',fieldName:'CaseOwnerName'},
        {label:'Case Open Days',fieldName:'DaysOpen',cellAttributes:{class:{fieldName:'cellClass'}}},
        {label:'CloseCase',type:'button-icon',typeAttributes:{iconName:'action:update_status'}},
    ]

    @wire(getOpenCases)
    caseRecords(response){
        this.wiredResponse = response;
        if(response.data){
            console.log(response.data);
            this.caseRecords = response.data.map(cas=>{
                const days = this.calculate_age(new Date(cas.CreatedDate));
                let flatCase = {...cas};
                flatCase.CaseOwnerName = cas.Owner.Name;
                flatCase.DaysOpen = days;
                flatCase.cellClass = days>=60 ? 'slds-theme_error' : 'slds-theme_warning';
                return flatCase;
            });
            
        }
        if(response.error){
            console.log(response.error);
        }
    }

    //Calculate Age
    calculate_age(createdDate){
        const currentDate = new Date();
        console.log(createdDate);
        var difference = currentDate.getTime() - createdDate.getTime();
        return Math.ceil(difference/(1000*60*60*24));
        //Days * 24 * 60 * 60 * 1000 is therefore the milliseconds in a day 
        //1000 milliseconds * 60 seconds * 60 minutes * 24 hours * days
    }

    handleRowAction(event){
        const rowId = event.detail.row.Id;
        console.log(rowId);
        const fields = {Id : rowId, Status : 'Closed'}
        updateRecord({fields})
        .then(response=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Case Closed successfully!',
                message: 'Record Id : ' + response.Id,
                variant: 'success'
            }))
            refreshApex(this.wiredResponse);
        })
        .catch(error=>{
            console.log(error);
            this.dispatchEvent(new ShowToastEvent({
                title: 'Case Update Error!',
                message:  'error',
                variant: 'error'
            }))
        })
    }
}