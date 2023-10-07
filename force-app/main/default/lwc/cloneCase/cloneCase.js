import { LightningElement,api,wire } from 'lwc';
import getCase from '@salesforce/apex/CaseController.getCase';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CloneCase extends LightningElement {
    @api recordId;
    caseRecord;

    handleClick(){
        getCase({recId : this.recordId})
        .then(response=>{
            console.log(response);
            this.dispatchEvent(new ShowToastEvent({
                title: 'Case Clone',
                message: 'Record Id : ' + response,
                variant: 'success'
            }))
        })
        .catch(error=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Case Clone',
                message:  'Error! Case not Cloned',
                variant: 'error'
            }))
        })
    }
}