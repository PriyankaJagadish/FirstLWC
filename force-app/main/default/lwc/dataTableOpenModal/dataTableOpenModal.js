import { LightningElement,wire } from 'lwc';
import getAccountList1 from '@salesforce/apex/AccountController.getAccountList1';

export default class DataTableOpenModal extends LightningElement {
    accountRow;
    modalContainer = false;
    columnsList = [
        {label: 'Id', fieldName : "Id"},
        {label: 'Name', fieldName : "Name"},
        {label: 'Rating', fieldName : "Rating"},
        {
            type: 'button-icon',
            typeAttributes : {
                iconName: 'utility:preview'
            }
        }
    ]

    @wire(getAccountList1)
    accountsList;    

    handleRowAction(event){
        this.accountRow = event.detail.row;
        this.modalContainer = true;
    }
    closeModal(){
        this.modalContainer = false;
    }
    
}