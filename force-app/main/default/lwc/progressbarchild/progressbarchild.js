import { LightningElement,api } from 'lwc';

export default class Progressbarchild extends LightningElement {
    progress = 0;

    //To disable the start button until the progress bar ends and then enable it.
    @api handleStart(){
        const timer = setInterval(()=>{
            this.progress = this.progress + 10;
            if(this.progress>=100){
                clearInterval(timer);
                const e = new CustomEvent('progressfinished');
                this.dispatchEvent(e);   
            }
        },300);    
    }

    @api handleReset(){
            this.progress = 0;
    }    
}