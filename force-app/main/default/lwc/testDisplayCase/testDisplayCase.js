import { LightningElement,wire } from 'lwc';
import getCaseList from '@salesforce/apex/CaseController.getCaseList';
const COLUMNS = [
    {label:'Case Owner Name',fieldName:'CaseOwner'},
    {label:'Case AGE',fieldName:'Case_Age__c', cellAttributes:{class:{fieldName:'CaseAgeColor'}}},
    {label:'Case Subject',fieldName:'Subject'}
]

export default class TestDisplayCase extends LightningElement {
    caseData;
    columns = COLUMNS;
    @wire(getCaseList)
    caseHandler({data,error}){
        if(data){
            console.log(data);
            this.caseData = data.map(cas=>{
                let caswithOwner = {...cas};
                caswithOwner.CaseOwner = cas.Owner.Name;
                caswithOwner.CaseAgeColor = cas.Case_Age__c >= 15 ? 'slds-text-color_success':'slds-text-color_error';
                console.log('---case---',caswithOwner);
                return caswithOwner;
            });
        }
        if(error){
            console.error(error);
        }
    }
}