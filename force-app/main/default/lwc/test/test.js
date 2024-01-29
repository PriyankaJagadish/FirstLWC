import { LightningElement } from 'lwc';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';
import BLOODDONOR_OBJECT from '@salesforce/schema/Blood_Donor__c';
import NAME_FIELD from '@salesforce/schema/Blood_Donor__c.Name__c';
import BLOOD_GROUP from '@salesforce/schema/Blood_Donor__c.Blood_Group__c';
import STATE_FIELD from '@salesforce/schema/Blood_Donor__c.State__c';
import DISTRICT_FIELD from '@salesforce/schema/Blood_Donor__c.District__c';
import WEIGHT_FIELD from '@salesforce/schema/Blood_Donor__c.Weight__c';
import PHONE_FIELD from '@salesforce/schema/Blood_Donor__c.Phone_No__c';
import LAST_DONATED from '@salesforce/schema/Blood_Donor__c.Last_Donated_Date__c';
import DOB_FIELD from '@salesforce/schema/Blood_Donor__c.DOB__c';
import EMAIL_FIELD from '@salesforce/schema/Blood_Donor__c.Email_ID__c';


export default class Test extends LightningElement {

    objectApiName = BLOODDONOR_OBJECT;
    fields = [NAME_FIELD,BLOOD_GROUP,STATE_FIELD,DISTRICT_FIELD,WEIGHT_FIELD,PHONE_FIELD,LAST_DONATED,DOB_FIELD,EMAIL_FIELD];

    handleSuccess(event){
        const toastEvent = new ShowToastEvent({
            title: "Blood Donor record has been created successfully!",
            message: "Blood Donor Record Id " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }
}