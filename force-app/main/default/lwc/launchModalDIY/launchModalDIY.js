import { LightningElement } from 'lwc';
import showmodal from './modaltemplate.html';
import maintemplate from './launchModalDIY.html';
export default class LaunchModalDIY extends LightningElement {
    userInput = '';
    isModalOpen = true;
    handleClick(event){
        this.userInput = event.target.label;
        this.isModalOpen = true;
    }
    closeModal() {
        this.userInput = '';
        this.isModalOpen = false;
    }

    render(){
        return this.userInput === "Launch Modal" ? showmodal : maintemplate ;
    }

    //lightning-modal
}