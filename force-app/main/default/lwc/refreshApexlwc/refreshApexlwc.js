import { LightningElement,wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import {refreshApex} from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RefreshApexlwc extends LightningElement {

    accountsList;
    wiredAccountResponse;

    @wire(getAccountList,{Rating :'Hot'})
    getAccountListHandler(response){
        this.wiredAccountResponse = response; //refreshApex called on wiredAccountResponse
        
        if(response.data){
            this.accountsList = response.data;
            console.log(JSON.stringify(this.accountsList));
        }
    }

    handleDelete(event){
        const recId = event.target.name;
        console.log(recId);
        deleteRecord(recId)
        .then(response=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Delete Record',
			    message: 'Record Id :' + recId ,
			    variant: 'success'
            }))
            //Calling refreshApex and passing the response to refresh page after deletion.
            refreshApex(this.wiredAccountResponse);
        })
        .catch(error=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Delete Record',
                message: 'Unable to delete Record',
                variant: 'error'
            }))
        })
    }
}