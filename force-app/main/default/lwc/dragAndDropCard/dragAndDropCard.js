import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class DragAndDropCard extends NavigationMixin(LightningElement) {

    @api records
    @api stage

    get isSameStage(){
        return this.stage === this.records.StageName;
    }
    navigateOppHandler(event){
        event.preventDefault();
        this.navigateHandler(event.target.dataset.id,'Opportunity');
    }

    navigateAccHandler(event){
        event.preventDefault();
        this.navigateHandler(event.target.dataset.id,'Account');
    }

    navigateHandler(Id,apiName){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId: Id,
                objectApiName: apiName,
                actionName:'view'
            }
        })
    }

    itemDragStart(){
        const event = new CustomEvent('itemdrag',{detail:this.record.Id});
        this.dispatchEvent(event);
    }
}