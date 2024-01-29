import { LightningElement,api } from 'lwc';
import LightningModal from 'lightning/modal';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class RecordEditFormModal extends LightningModal  {
    @api recordId;

    handleClose(){
        this.close('Close');
    }
    handleSave(){
        this.close('Save');
    }
    successHandler(event){
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success',
            message: 'Contact Updated Successfully!' ,
            variant: 'success'
        }));
        this.close('Save');
    } 
}