import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import BLOODDONOR_OBJECT from '@salesforce/schema/Blood_Donor__c';
import NAME_FIELD from '@salesforce/schema/Blood_Donor__c.Name__c';
import BLOODGROUP from '@salesforce/schema/Blood_Donor__c.Blood_Group__c';
import STATE_FIELD from '@salesforce/schema/Blood_Donor__c.State__c';
import DISTRICT_FIELD from '@salesforce/schema/Blood_Donor__c.District__c';
import WEIGHT_FIELD from '@salesforce/schema/Blood_Donor__c.Weight__c';
import PHONE from '@salesforce/schema/Blood_Donor__c.Phone_No__c';
import LASTDONATED from '@salesforce/schema/Blood_Donor__c.Last_Donated_Date__c';
import DOB from '@salesforce/schema/Blood_Donor__c.DOB__c';
import EMAIL from '@salesforce/schema/Blood_Donor__c.Email_ID__c';

export default class CreateBloodDonor extends LightningElement {

    objectApiName = BLOODDONOR_OBJECT;
    fields = [NAME_FIELD,BLOODGROUP,STATE_FIELD,DISTRICT_FIELD,WEIGHT_FIELD,PHONE,LASTDONATED,DOB,EMAIL];

    handleSuccess(event){
        const toastEvent = new ShowToastEvent({
            title: "Blood Donor Record Created Successfully!",
            message: "Record Id" + event.detail.Id,
            variant: "Success"
        });
        this.dispatchEvent(toastEvent);
    }
}