public with sharing class GoogleController {
    @AuraEnabled(cacheable = true)
    public static string translateInput(String inputLang,String outputLang,String sourceText){
        HTTPRequest req = new HTTPRequest();
        HTTPResponse res = new HTTPResponse();
        HTTP http = new HTTP();
        req.setEndPoint('https://google-translate1.p.rapidapi.com/language/translate/v2');
        req.setMethod('POST');
        req.setHeader('content-type','application/x-www-form-urlencoded');
        req.setHeader('X-RapidAPI-Key', 'ccda1a24fdmshbc74a73a30196fdp1b2c91jsna9dc35f13e5a');
        req.setHeader('X-RapidAPI-Host','google-translate1.p.rapidapi.com');

        String body = 'q='+sourceText + '&source=' +inputLang+'&target='+outputLang;
        req.setBody(body);

        res = http.send(req);
        Map<String,Object> responseMap = (Map<String,Object>)JSON.deserializeUntyped(res.getBody());
        Map<String,Object> data = (Map<String,Object>)responseMap.get('data');
        Map<String,Object> translations = (Map<String,Object>)((List<Object>)data.get('translations'))[0];
        String translatedText = (String)translations.get('translatedText');
        return translatedText;    
    }
}