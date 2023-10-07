import { LightningElement,api,wire } from 'lwc';
import updateAnnualRevenue from '@salesforce/apex/AccountController.updateAnnualRevenue';

export default class RefreshRecordDetailAuraLWC extends LightningElement {
    @api recordId;


    handleClick(event){
        
        console.log(this.recordId);
        updateAnnualRevenue({recId : this.recordId})
        .then(response=>{
            this.dispatchEvent(new CustomEvent('refreshaccount',{
                detail: 'Refresh Account'
            }))
        })
        .catch(error=>{
            console.log(error);
        })

    }
}