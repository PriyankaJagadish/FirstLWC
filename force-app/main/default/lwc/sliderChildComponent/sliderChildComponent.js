import { LightningElement,api } from 'lwc';

export default class SliderChildComponent extends LightningElement {

    @api slidervalue;
    @api maxslidervalue;

    @api resetslidervalue(){
        this.slidervalue = 0;
    }
}