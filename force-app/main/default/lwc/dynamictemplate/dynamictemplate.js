import { LightningElement } from 'lwc';
import contact from './contactTemplate.html';
import account from './accountTemplate.html';
import mainTemplate from './dynamictemplate.html';
export default class Dynamictemplate extends LightningElement {
    userInput = '';

    handleClick(event){
        this.userInput = event.target.label;
    }
    render(){
        return this.userInput === "Account" ? account : this.userInput === "Contact" ? contact : mainTemplate ;
    }
    handleBack(){
        this.userInput = '';
    }
}