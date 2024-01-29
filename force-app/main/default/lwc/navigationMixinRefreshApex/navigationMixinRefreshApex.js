import { LightningElement,wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getAccountList1 from '@salesforce/apex/AccountController.getAccountList1';
import {refreshApex} from '@salesforce/apex';

export default class NavigationMixinRefreshApex extends NavigationMixin(LightningElement){

    columnsList = [
        {label: 'Id', fieldName : "Id"},
        {label: 'Name', fieldName : "Name"},
        {label: 'Rating', fieldName : "Rating"}
    ];
    accountsList;
    wiredResponse;
    
    @wire(getAccountList1)
    accounts(response){
        this.wiredResponse = response;
        if(response.data){
            this.accountsList = response.data;
            //this.handleRefresh();
        }
    }

    connectedCallback(){
       if(this.wiredResponse.data){
            refreshApex(this.wiredResponse);
        }
    }
    handleRefresh(){
        //Calling refreshApex and passing the response to refresh page after deletion.
        refreshApex(this.wiredResponse);
    }

    newAccountPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Account',
                actionName:'new'
            },
            state : {
                //count: '1',
                //nooverride: '1',
                //useRecordTypeCheck : '1',
                navigationLocation: 'RELATED_LIST',
            }
        });
        refreshApex(this.wiredResponse);
    }
    newAccountPage1(){
        this[NavigationMixin.generateURL]({
            type:'standard__recordPage',
            attributes:{
                recordId:'0015j00001Si3GVAAZ',
                objectApiName:'Account',
                actionName:'view',
            }
        })
        .then(generatedURL=>{
            this.recordPageURL = generatedURL;
            window.open(generatedURL);
        })
        .then(()=>{
            refreshApex(this.wiredResponse);
        })
    }

}