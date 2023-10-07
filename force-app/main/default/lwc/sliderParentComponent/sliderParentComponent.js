import { LightningElement,api } from 'lwc';

export default class SliderParentComponent extends LightningElement {
    sliderval;
    @api maxslidervalue;

    handleChange(event){
        this.sliderval = event.target.value;
    }

    handleClick(event){
        this.template.querySelector("c-slider-child-component").resetslidervalue();
    }
}