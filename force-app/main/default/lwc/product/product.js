import { LightningElement,track } from 'lwc';

export default class Product extends LightningElement {
isStockAvailable;
@track product = {
            name : 'Apple',
            price: 500,
            stock: 100
        } 
            
        handleChange(event){
            this.product.stock = event.target.value;
            if(this.product.stock == 0){
                this.isStockAvailable = false;
            }
            else{
                this.isStockAvailable = true;
            }
        }           
}