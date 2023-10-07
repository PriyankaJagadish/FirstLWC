import { LightningElement } from 'lwc';

export default class Welcome extends LightningElement {
    name;
    colorcss = 'red';

    handleChange(event){
        this.name = event.target.value;
    }

    handleClick(event){
        if(event.target.label === 'Red'){
            this.colorcss = 'red';
        }
        else{
            this.colorcss = 'blue';
        }
    }
}