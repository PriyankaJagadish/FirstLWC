import { LightningElement,wire, api} from 'lwc';
import { getObjectInfo,getPicklistValues } from 'lightning/uiObjectInfoApi';
import {getRecord,getFieldValue} from 'lightning/uiRecordApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class DisplayPicklistValues extends LightningElement {
recordTypeId;

industryOptions;
indValue;
value;

    @wire(getObjectInfo,{objectApiName :'Account'})
    getObjectInfo({data,error}){
        if(data){
            console.log(data.recordTypeInfos);     
            this.recordTypeId = Object.values(data.recordTypeInfos).map(d=>{
                return {label: d.name, 
                        value: d.recordTypeId}; 
            });
            console.log(this.recordTypeId);
        }
    }

    handleChange(event){
        this.value = event.detail.value;
    }
    
    handleChange1(event){
        this.indValue = event.detail.value;
    }

    @wire(getPicklistValues,{recordTypeId:'$value',fieldApiName : INDUSTRY_FIELD})
    getPicklistData({data,error}){
        if(data){
           console.log(data.values);
           this.industryOptions = data.values.map(d=>{
                return {label: d.label,
                        value: d.value};
           });
        }
        if(error){
            console.log(error);
        }
    }
}