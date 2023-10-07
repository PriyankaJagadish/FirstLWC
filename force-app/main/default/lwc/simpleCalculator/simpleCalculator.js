import { LightningElement} from 'lwc';

export default class SimpleCalculator extends LightningElement {

    number1;
    number2;
    operator;
    result;

    handleChange(event){
        if(event.target.name == "input1"){   
            this.number1 = parseInt(event.target.value);   
        }
        else if(event.target.name == "input2"){
           this.number2 = parseInt(event.target.value);  
        }
    }

    handleClick(event){
        if(event.target.name == "Add"){
            if(isNaN(this.number1) || isNaN(this.number2)){
                alert("Please Enter a Number!");
            }
            else{
                this.result = this.number1 + this.number2;
            }
        }
        else if(event.target.name == "Sub"){
            if(isNaN(this.number1) || isNaN(this.number2)){
                alert("Please Enter a Number!");
            }
            else{
                this.result = this.number1 - this.number2;
            }

        }else if(event.target.name == "Mul"){
            if(isNaN(this.number1) || isNaN(this.number2)){
                alert("Please Enter a Number!");
            }
            else{
                this.result = this.number1 * this.number2;
            }
            
        }else if(event.target.name == "Div"){
            if(isNaN(this.number1) || isNaN(this.number2)){
                alert("Please Enter a Number!");
            }
            else{
                this.result = this.number1 / this.number2;
            }
        }
    }

    /*validateResult(res){
        if(isNaN(res)){
            this.result = ' ';
            this.alertFn();
        }
    }*/
    
    clear(){
        this.number1 = ' ';
        this.number2 = ' ';
        this.result = ' ';
    }

}