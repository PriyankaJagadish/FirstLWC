public with sharing class WeatherController {
    @AuraEnabled
    public static WeatherDetailsWrapper getWeatherDetails(String city){
       
        //Set the EndPoint
        String apiKey = '11b63feb9fe63dce537e3dcbf95b1640';
        String endPoint = 'https://api.openweathermap.org/data/2.5/weather';
        endPoint += '?q=' + city;
        endPoint += '&units=metric'; // To return the data in standard units
        endPoint += '&appid=' + apiKey;
        System.debug('EndPoint URL : ' + endPoint);

        //Call the Weather API
        HTTP http = new HTTP();
        HttpRequest req = new HttpRequest();
        req.setEndPoint(endPoint);
        req.setMethod('GET');
        HTTPResponse response = http.send(req);
        System.debug('Response' + response + 'Body'+ JSON.deserializeUntyped(response.getBody()));

        //Get the Weather Details in a Wrapped Form
        WeatherDetailsWrapper weatherDetails = new WeatherDetailsWrapper();
        if(response.getStatusCode() == 200 || response.getStatusCode() == 201) {
            Map<String,Object> weatherMap =  (Map<String,Object>)JSON.deserializeUntyped(response.getBody());
            weatherDetails.city = String.valueOf(weatherMap.get('name'));
            Map<String,Object> weatherMapMain = (Map<String,Object>)(weatherMap.get('main'));
            weatherDetails.temperature = String.valueOf(weatherMapMain.get('temp'));
            weatherDetails.pressure = String.valueOf(weatherMapMain.get('pressure'));
            weatherDetails.humidity = String.valueOf(weatherMapMain.get('humidity'));
            weatherDetails.feelsLike = String.valueOf(weatherMapMain.get('feels_like'));
            weatherDetails.tempMin = String.valueOf(weatherMapMain.get('temp_min'));
            weatherDetails.tempMax = String.valueOf(weatherMapMain.get('temp_max'));
        }
        return weatherDetails; 
    }

    //Wrapper Class
    public class WeatherDetailsWrapper{
        @AuraEnabled public String city {get;set;}
        @AuraEnabled public String temperature {get;set;}
        @AuraEnabled public String pressure {get;set;}
        @AuraEnabled public String humidity {get;set;}
        @AuraEnabled public String feelsLike {get;set;}
        @AuraEnabled public String tempMin {get;set;}
        @AuraEnabled public String tempMax {get;set;}
    }
}