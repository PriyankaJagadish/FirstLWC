import { LightningElement } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
const filter = {
    criteria:[
        {
            fieldPath:'Industry',
            operator:'eq',
            value:'Agriculture'
        },
        {
            fieldPath:'Type',
            operator:'eq',
            value:'Prospect'
        },
    ]
}
const matchingInfo={
    primaryField:{fieldPath : 'Name'},
    additionalFields:[{fieldPath : 'Phone'}],
}
const columns = [
    {
        label: 'First Name',
        fieldName: 'FirstName',
        type: 'text'
    },
    {
        label: 'Last Name',
        fieldName: 'LastName',
        type: 'text'
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'Phone'
    },
]
export default class LightningRecordPicker extends LightningElement {
    accId;
    filter = filter;
    matchingInfo = matchingInfo;
    columnsList = columns;
    dataList;

    handleChange(event){
        this.accId = event.detail.recordId;
        this.getRelatedContacts();
    }
    getRelatedContacts(){
        getContacts({accId : this.accId})
        .then(result=>{
            this.dataList = result;
        })
        .catch(error=>{
            this.error = error;
        })
    }
}