import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavigationMixinInLWC extends NavigationMixin(LightningElement) {
    @api recordId;
    recordPageURL;
    newAccountPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Account',
                actionName:'new'
            },
        });
    }
       
    viewAccountPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:this.recordId,
                objectApiName:'Account',
                actionName:'view'
            },
        });
    }

    editAccountPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:this.recordId,
                objectApiName:'Account',
                actionName:'edit'
            },
        });
    }
    generateURL(){
        this[NavigationMixin.generateURL]({
            type:'standard__recordPage',
            attributes:{
                recordId:this.recordId,
                actionName : 'view',
            },
        })
        .then(generatedURL=>{
            this.recordPageURL = generatedURL;
        });
    }
}