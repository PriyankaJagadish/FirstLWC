import { LightningElement,wire } from 'lwc';
import getAccountList1 from '@salesforce/apex/AccountController.getAccountList1';
import {refreshApex} from '@salesforce/apex';
import modal from 'c/recordEditFormModal';
export default class EmbedRecordEditFormModal extends LightningElement {

    wiredAccountResponse;
    accountsList;
    error;

    columnsList = [
        {label: 'Id', fieldName : "Id"},
        {label: 'Name', fieldName : "Name"},
        {label: 'Rating', fieldName : "Rating"},
        {
            type: 'button-icon',
            typeAttributes : {
                iconName: 'utility:edit'
            }
        }
    ]
 

    @wire(getAccountList1)
    getAccountListHandler(response){
        this.wiredAccountResponse = response;         
        if(response.data){
            this.accountsList = response.data;
            this.error = undefined;
        }
        if(response.error){
            this.error = error;
            this.accountsList = undefined;
        }
    }

    handleRowAction(event){
        const rowId = event.detail.row.Id;
        this.openModal(rowId);
    }

    openModal(recordId){
        console.log(recordId);
         modal.open({
            size: 'small',
            description: 'Edit Account Record',
            recordId: recordId,
        })
        .then(result=>{
            console.log(result);
            this.refreshData();  
        })
        .catch(error=>{
            console.log(error);
        })
    }

    refreshData(){
        return this.wiredAccountResponse ? refreshApex(this.wiredAccountResponse) : undefined;
    }  
}