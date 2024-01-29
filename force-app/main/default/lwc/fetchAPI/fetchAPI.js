import { LightningElement } from 'lwc';

export default class FetchAPI extends LightningElement {
    cityName;   
    temperature;
    minTemp;
    maxTemp;
    pressure;
    humidity;
    city;
    apiKey = '11b63feb9fe63dce537e3dcbf95b1640';
    endPoint = 'https://api.openweathermap.org/data/2.5/weather';


    handleChange(event){
        this.city = event.detail.value;
    }

    handleClick(){
        const url = this.endPoint + '?q=' + this.city + '&appId='+this.apiKey;
        fetch(url)
            .then(response => response.json())
            .then(response=>{
                console.log(response);   
                this.cityName = response.name;
                this.temperature = response.main.temp;
                this.minTemp = response.main.temp_min;
                this.maxTemp = response.main.temp_max;
                this.pressure = response.main.pressure;
                this.humidity = response.main.humidity;
            })
            .catch(error=>{
               this.error = error;
               console.log('inside error');
               console.log(this.error);
            })
    }
}