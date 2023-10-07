import { LightningElement } from 'lwc';
import LightningModal from 'lightning/modal';

export default class Modal extends LightningModal {

    handleClose() {
        this.close('close popup');
    }
}