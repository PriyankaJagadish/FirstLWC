import { LightningElement,wire,api } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
export default class DisplayRelatedContacts extends LightningElement {

    contactsList;
    @api recordId;

    handleClick(event){
        console.log(this.recordId);
        getContacts({accId : this.recordId})
        .then(result=>{
            this.contactsList = result;
            console.log(this.contactsList);
        })
        .catch(error=>{
            console.log(error);
        })
    }
}