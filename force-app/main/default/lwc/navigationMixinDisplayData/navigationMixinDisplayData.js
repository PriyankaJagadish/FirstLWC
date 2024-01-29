import { LightningElement,wire } from 'lwc';
import getAccountList1 from '@salesforce/apex/AccountController.getAccountList1';
import {refreshApex} from '@salesforce/apex';

export default class NavigationMixinDisplayData extends LightningElement {

    columnsList = [
        {label: 'Id', fieldName : "Id"},
        {label: 'Name', fieldName : "Name"},
        {label: 'Rating', fieldName : "Rating"}
    ]

    @wire(getAccountList1)
    accountsList;

    handleRefresh(){
        //Calling refreshApex and passing the response to refresh page after deletion.
        refreshApex(accountsList);
    }
}