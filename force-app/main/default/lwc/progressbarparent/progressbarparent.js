import { LightningElement } from 'lwc';

export default class Progressbarparent extends LightningElement {

    //To disable the start button until the progress bar ends and then enable it.
    handleClick(){
        this.template.querySelector("c-progressbarchild").handleStart();
        this.template.querySelector("lightning-button").disabled=true;  
    }

    handleFinish(){
        this.template.querySelector("c-progressbarchild").handleReset();
        this.template.querySelector("lightning-button").disabled = false;        
    }
}