import { LightningElement } from 'lwc';

export default class ProgressBar extends LightningElement {
    progress = 0;
    timer;
    isProgress = false;

    
    handleClick(){
        if(this.isProgress){
            this.template.querySelector("lightning-button").label = "Start";  
            this.isProgress = false;
            clearInterval(this.timer);
            //clearInterval(this._interval);
        }
        else{
            this.template.querySelector("lightning-button").label = "Stop";  
            this.isProgress = true;
            this.timer = setInterval(()=>{
                this.progress = this.progress + 10;
                if(this.progress === 100){
                    this.progress = 0;
                }
            },300);  
        }
    }
    handleReset(){
        this.progress = 0;
    }
}