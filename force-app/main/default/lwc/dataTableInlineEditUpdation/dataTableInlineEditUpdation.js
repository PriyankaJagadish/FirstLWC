import { LightningElement,wire } from 'lwc';
import getAccountList1 from '@salesforce/apex/AccountController.getAccountList1';
import { updateRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DataTableInlineEditUpdation extends LightningElement {

    columnsList = [
        {label: 'Id', fieldName : "Id"},
        {label: 'Name', fieldName : "Name", editable:true},
        {label: 'Rating', fieldName : "Rating", editable:true}
    ]

    saveDraftValues;
    accountsList;
    wiredAccountResponse;

    @wire(getAccountList1)
    getAccountHandler(response){
        this.wiredAccountResponse = response;
        if(response){
            this.accountsList = response.data;
        }
    }

    handleSave(event){
        this.saveDraftValues = event.detail.draftValues;
        console.log(this.saveDraftValues);
        console.log(JSON.stringify(this.saveDraftValues));

        //Converting the proxy to array of Objects
        //const values = JSON.parse(JSON.stringify(this.saveDraftValues));
        const v = this.saveDraftValues.map(m=>{
            console.log(m);
            return {fields:m};
        })

        //slice() method also can be used to convert proxy to array of objects
        /*
        const recInputs = this.saveDraftValues.slice().map(draft=>{	
	    const f= Object .assign({},draft) // this will change draft as {object}
	    return {fields: f}; 
        })	
        */

        const promises = v.map(recordInput => updateRecord(recordInput));
        Promise.all(promises) // waits until all the records are updated
        .then(response=>{
            this.dispatchEvent(new ShowToastEvent({
                title:'Update Record',
                message:'Record has been succesfully updated!',
                variant: 'success'
            }))
            this.saveDraftValues = [];

            //Refresh Data Table
            refreshApex(this.wiredAccountResponse);
        })
        .catch(error =>{
            console.log(error);
        })

        
    }
}