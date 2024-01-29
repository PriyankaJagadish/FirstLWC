import { LightningElement,wire } from 'lwc';
import getAccountList1 from '@salesforce/apex/AccountController.getAccountList1';
import { deleteRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DataTableDeleteRecord extends LightningElement {

    columnsList = [
        {label: 'Id', fieldName : "Id"},
        {label: 'Name', fieldName : "Name"},
        {label: 'Rating', fieldName : "Rating"},
        {
            type: 'button-icon',
            typeAttributes : {
                iconName: 'utility:close'
            }
        }
    ]

    @wire(getAccountList1)
    accountsList;

    handleRowAction(event){
        //console.log(JSON.stringify(event.detail));
        //console.log(JSON.stringify(event.detail.row));
        const row = event.detail.row;
        const rowId = event.detail.row.Id;
        console.log(row.Id);
        console.log(rowId);
        deleteRecord(rowId)
        .then(response=>{
            
            this.dispatchEvent(new ShowToastEvent({
                title: 'Delete Record',
			    message: 'Record Id :' + rowId ,
			    variant: 'success'
            }))
            //Calling refreshApex and passing the response to refresh page after deletion.
            refreshApex(this.accountsList);
        })
        .catch(error=>{
            console.log(error);
            const errorMessage = error.body.output.errors[0].message;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Delete Record',
                message: errorMessage,
                variant: 'error'
            }))
        })
    }
}