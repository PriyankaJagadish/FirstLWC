import { LightningElement } from 'lwc';
import modal from 'c/modal';
export default class EmbedModal extends LightningElement {

    async openModal(){
        const result = await modal.open({
            size: 'small', //small, medium, or large default :medium
            description: 'Accessible description of modal\'s purpose',
            content: 'Open Modal',
        });
        console.log(result);
    }
}