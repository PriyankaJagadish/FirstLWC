import { LightningElement,wire,track,api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import {getObjectInfo} from 'lightning/uiObjectInfoApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {CloseActionScreenEvent} from 'lightning/actions';           

import CONTACT_OBJ from '@salesforce/schema/Contact';
import GENDER_FIELD from '@salesforce/schema/Contact.GenderIdentity';
import saveMultipleContacts from '@salesforce/apex/ContactController.saveMultipleContacts';

export default class AddMultipleContacts extends LightningElement {
    @api recordId;
    @track contacts = [];
    isLoading = false;

    //Static Picklist values
    genders = [
        {label:'Male',value:'male'},
        {label:'Female',value:'female'}
    ]

    //Dynamically fetching the Gender Picklist Values from Contact Object
    @wire(getObjectInfo,{objectApiName:CONTACT_OBJ})
    contactObjectInfo;

    @wire(getPicklistValues,{recordTypeId:'$contactObjectInfo.data.defaultRecordTypeId',fieldApiName:GENDER_FIELD})
    genderPicklistValues;

    //We can also use genderPicklistValues.data directly in the HTML file,
    //But since it is fetched using wire Adapter, on initial component load, this property will be undefined
    //So to avoid fetching undefined data, we use Getter to check if value is present using ?
    //checking and then if present , getting the Picklist Values.
    get getGenderPicklistValues(){
        return this.genderPicklistValues?.data?.values;
    }

    //Whenever the component is loaded, the connected CallBack method will be called
    connectedCallback(){
        this.handleAdd();
    }

    handleAdd(event){
        this.contacts.push({
            tempId: Date.now() //tempId will act as unique identifier for each row
        })
    }
    handleDelete(event){
       if(this.contacts.length == 1){
        this.showToast('You cannot delete the Last Contact!');
        return;
       }
       let tempId = event.target?.dataset.tempId;
       //get the contacts after filtering the current deleted contact
       this.contacts = this.contacts.filter(con=>con.tempId != tempId);
    }
    handleValueChange(event){
        let firstName = event.target?.value;
        let contactRow = this.contacts.find(con=>con.tempId == event.target.dataset.tempId);
        if(contactRow){
           // contactRow['FirstName'] = firstName;
           contactRow[event.target.name] = event.target.value;
        }
    }
    async handleSubmit(event){
        const allValid = this.checkControlsValidity();
        if (allValid){
            this.isLoading = true;
            this.contacts.forEach(con=>con.AccountId = this.recordId);
            let response = await saveMultipleContacts({conList : this.contacts});
            if(response.isSuccess){
                this.showToast('Contacts Saved Successfully!','Success','success');
                this.dispatchEvent(new CloseActionScreenEvent());
            }
            else{
                this.showToast('Something went Wrong while saving Contacts!', +response.message);
            }
            this.isLoading = false;
        }
        else{
            this.showToast('Please Correct the below errors to proceed further!');
        }
    }
    checkControlsValidity(){
        let isValid = true,
        controls = this.template.querySelectorAll('lightning-input,lightning-combobox');
        controls.forEach(field=>{
            if(!field.checkValidity()){
                field.reportValidity();
                isValid = false;
            }
        });
        return isValid;
    }

    showToast(message,title='Error',variant='Error'){
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
}