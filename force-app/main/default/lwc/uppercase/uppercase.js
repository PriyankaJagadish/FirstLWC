import { LightningElement } from 'lwc';

export default class Uppercase extends LightningElement {
    text;
    upText;

    handleChange(event){
           this.upText = event.target.value.toUpperCase();
    }

}