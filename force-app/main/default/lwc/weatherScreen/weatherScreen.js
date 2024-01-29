import { LightningElement } from 'lwc';
import getWeatherDetails from '@salesforce/apex/WeatherController.getWeatherDetails';
export default class WeatherScreen extends LightningElement {

    inputCity ;
    weatherDetails;
    showWeatherDetails = false;

    handleChange(event){
        this.inputCity = event.detail.value;
        console.log(this.inputCity);
    }

    handleWeatherDetails(){
        getWeatherDetails({city : this.inputCity})
        .then(result=>{
            this.showWeatherDetails = true;
            console.log('inside'+this.inputCity);
            this.weatherDetails = result;
            console.log(result);
            console.log(JSON.stringify(result));
        })
        .catch(error=>{
            this.showWeatherDetails = false;
            this.error = error;
        })
        
        console.log(this.weatherDetails);
    }
}