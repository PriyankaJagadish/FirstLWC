import { LightningElement } from 'lwc';
import translateInput from '@salesforce/apex/GoogleController.translateInput';

export default class GoogleTranslate extends LightningElement {

    sourceText;
    targetText = '';
    sourceLanguage = 'en';
    targetLanguage = 'hi';

    get options(){
        return [
            {label: 'English',value : 'en'},
            {label: 'French',value : 'fr'},
            {label: 'Hindi',value : 'hi'},
            {label: 'German',value : 'de'},
            {label: 'Italian',value : 'it'}        
        ];
    }

    SourceLanguageChangeHandler(event){
        this.sourceLanguage = event.detail.value;
    }

    TargetLanguageChangeHandler(event){
        this.targetLanguage = event.detail.value;
    }

    SourceTextChangeHandler(event){
        this.sourceText = event.detail.value;
    }

    handleTranslate(event){
        translateInput({inputLang : this.sourceLanguage,outputLang : this.targetLanguage,sourceText : this.sourceText})
        .then(result=>{
            this.targetText = result;
            console.log(this.targetText);
        })
        .catch(error=>{
            this.error = error;
            console.log(this.error);
        })
    }
}