import { LightningElement,api} from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';

import ID from '@salesforce/schema/Account.Id';
import NAME from '@salesforce/schema/Account.Name';
import INDUSTRY from '@salesforce/schema/Account.Industry';
import ANNUAL_REVENUE from '@salesforce/schema/Account.AnnualRevenue';

export default class UpdateRecordDIY extends LightningElement {
  
    recordId;
    name;
    industry;
    aRevenue;

  /*  handleChange(event){
        if(event.target.name === "Id"){
            this.recordId = event.target.value;
        }else if(event.target.name === "Name"){
            this.name = event.target.value;
        }else if(event.target.name === "Industry"){
            this.industry = event.target.value;
        }else if(event.target.name === "AnnualRevenue"){
            this.aRevenue = event.target.value;
        }
    }
    
    handleClick(){
        const fields = {};
        fields[ID.fieldApiName] = this.recordId;
        fields[NAME.fieldApiName] = this.name;
        fields[INDUSTRY.fieldApiName] = this.industry;
        fields[ANNUAL_REVENUE.fieldApiName] = this.aRevenue;

        const recordInput={fields:fields};
        updateRecord(recordInput).then((record)=>{
            console.log(this.recordId);
            console.log(record);
        });
    }*/
    formData ={};
    handleChange(event){
        const {name,value} = event.target;
        this.formData[name] = value;
        console.log(JSON.stringify(this.formData));
    }
    handleClick(){
        console.log('inside click method');
        debugger
        
        updateRecord({fields:this.formData})
        .then(response=>{
            console.log(response);
            this.formData={};
        })
        .catch(error=>{
            console.log(error);
        });
    }

}
  
  
  
  
  
  
  
  
  
  
    
   


