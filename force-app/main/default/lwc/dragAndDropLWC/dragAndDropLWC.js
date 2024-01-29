import { LightningElement,wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import { getPicklistValues,getObjectInfo } from 'lightning/uiObjectInfoApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import OPPORTUNITY_OBJ from '@salesforce/schema/Opportunity';
import STAGE_NAME from '@salesforce/schema/Opportunity.StageName';
import ID_FIELD from '@salesforce/schema/Opportunity.Id';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class DragAndDropLWC extends LightningElement {
    records;
    pickListValues;
    recordId;

    //Wire to Fetch Opportunity List View
    @wire(getListUi,{objectApiName : OPPORTUNITY_OBJ,listViewApiName:'AllOpportunities'})
    wiredListView({data,error}){
        if(data){
            console.log('getListUi',data);
            this.records = data.records.records.map(item=>{
            let field = item.fields;
            let account = field.Account.value == null ? '' : field.Account.value.fields;
            return {'Id' : field.Id == null ? '' : field.Id.value,
                    'Name': field.Name == null ? '' : field.Name.value,
                    'AccountId' : account.Id == null ? '' : account.Id.value,
                    'AccountName' : account.Name == null ? '' : account.Name.value,
                    'CloseDate' : field.CloseDate == null ? '' : field.CloseDate.value,
                    'StageName' : field.StageName == null ? '' : field.StageName.value,
                    'Amount' : field.Amount == null ? '' : field.Amount.value};
            });
        }

        if(error){
            console.log(error);
        }
    }
    
    //Wire to Fetch Metadata about the Opportunity Object
    @wire(getObjectInfo,{objectApiName : OPPORTUNITY_OBJ})
    wireObjectInfo
    
    //Wire to Fetch StageName Picklist Values
    @wire(getPicklistValues,{recordTypeId:'$wireObjectInfo.data.defaultRecordTypeId',fieldApiName:STAGE_NAME})
    stagePicklistValues({data,error}){
        if(data){
            console.log('Stage Picklist',data);
            this.pickListValues = data.values.map(item=>item.value);
        }

        if(error){
            console.log(error);
        }
    }

    //Getter to calculate the width dynamically
    get calcWidth(){
        let len = this.pickListValues.length +1;
        return `width: calc(100vw/ ${len})`;
    }

    handleListItemDrag(event){
        this.recordId = event.detail;
    }

    handleItemDrop(event){
        let stage = event.detail;
        /*this.records = this.records.map(item=>{
            return item.Id === this.recordId ? {...item, StageName : stage} : {...item};
        })*/

        //After Dropping update the Opportunity Records
        this.updateHandler(stage);
    }

    updateHandler(stage){
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[STAGE_NAME.fieldApiName] = stage;
        const recordInput = {fields};

        updateRecord(recordInput)
        .then((response)=>{
            console.log('Updated Successfully');
            this.showToast();
            return refreshApex(this.wiredListView);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    showToast(){
        this.dispatchEvent(
            new ShowToastEvent({
                title:'Success',
                message:'Stage Updated Successfully!',
                variant:'success'
            })
        )
    }
}