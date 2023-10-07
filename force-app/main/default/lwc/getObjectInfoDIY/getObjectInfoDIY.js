import { LightningElement,api,wire,track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import {getRecord,getFieldValue,getRecordUi} from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';


export default class GetObjectInfoDIY extends LightningElement {

    fieldNames;
    objectKeys = [];
    objectValues = [];
    customFields = [];
    fieldApiNames = [];
    
    pickListCount = 0;
    customCount = 0;
    noOfFields = 0;
    noOfRecordTypes = 0;
    @api objectApiName 
    @wire(getObjectInfo,{objectApiName:'$objectApiName'})
    
    objectInfo({data,error}){
        if(data){
            this.fieldNames = data.fields;
            console.log(this.fieldNames);    
            
            this.objectKeys = Object.keys(this.fieldNames);
            this.noOfFields = this.objectKeys.length;
            this.objectValues = Object.values(this.fieldNames);
            this.noOfRecordTypes = Object.keys(data.recordTypeInfos).length;

            
            //console.log(JSON.stringify(this.values));
            this.objectKeys.forEach(ele => {
                if(ele.includes("__c")){
                    this.customFields.push(ele);
                }    
            });
            
            //Getting the count of Picklist fields
            this.objectValues.forEach(ele =>{
                if(ele.dataType === "Picklist"){
                    this.pickListCount++;
                }   
            });
            
            //Getting the count of custom Fields
            this.objectValues.forEach(ele =>{  
                if(ele.custom === true ){
                    this.customCount++;
                }            
            });

            //Getting all the Field Api Names
            this.objectValues.forEach(ele =>{    
                this.fieldApiNames.push(ele.apiName);  
            });
            
            console.log((this.customFields).length);
            console.log(this.pickListCount);
            console.log(this.customCount);
            console.log(Object.keys(data.recordTypeInfos).length);
            console.log(JSON.stringify(this.fieldApiNames)); 
            
        }
        if(error){
            console.log(error);
        }
    }

}