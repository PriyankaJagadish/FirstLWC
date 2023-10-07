import { LightningElement,wire,track } from 'lwc';
import { getObjectInfo,getPicklistValues } from 'lightning/uiObjectInfoApi';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import getAccountList1 from '@salesforce/apex/AccountController.getAccountList1';
import { updateRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class DataTableCustomColumnPicklist extends LightningElement {
recordTypeId;
@track ratingOptions;
accountsList;
saveDraftValues;
wiredAccountResponse;

columnsList=[
    {label: 'Id',fieldName : "Id"},
    {label: 'Name',fieldName :"Name",editable:true},
    {label: 'Rating',fieldName :'Rating', type :'ratingPicklist', editable:true,
      typeAttributes:
        {options: {fieldName : 'ratingOptions'},
         value: { fieldName: 'Rating' }
        }
    }  
]

    @wire(getObjectInfo, {objectApiName :'Account'})
    getObjectInfo({data,error}){
	    if(data){
		    this.recordTypeId = data.defaultRecordTypeId;
        }
        if(error){
            console.log(error);
        }
    }

    @wire(getPicklistValues,{recordTypeId:'$recordTypeId', fieldApiName : RATING_FIELD})
    getPicklistData({data,error}){
        if(data){
            
            this.ratingOptions = data.values;
        }
        if(error){
            console.log(error);
        }
    }

    @wire(getAccountList1,{Rating: '$ratingOptions'})
    getAccountHandler(response){
        this.wiredAccountResponse = response;
        if(response.data){
            this.accountsList = JSON.parse(JSON.stringify(response.data));
            this.accountsList.forEach(ele=>{
                ele.ratingOptions = this.ratingOptions;
            })
        }
    }


    handleSave(event){
        this.saveDraftValues = event.detail.draftValues;

        const v = this.saveDraftValues.map(m=>{
            console.log(m);
            return {fields:m};
        })

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