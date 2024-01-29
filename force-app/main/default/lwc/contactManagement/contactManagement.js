import { LightningElement,wire } from 'lwc';
import getAllContacts from '@salesforce/apex/ContactController.getAllContacts';
import bulkDeleteContacts from '@salesforce/apex/ContactController.bulkDeleteContacts';
import { deleteRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';

export default class ContactManagement extends LightningElement {
contacts;
error;
isModalOpen = false;
editRecordId;
wiredContacts;
searchContact = '';
selectedRows = [];
    columns=[
        {label:'First Name',fieldName :'FirstName'},
        {label:'Last Name',fieldName :'LastName'},
        {label:'Title',fieldName :'Title'},
        {label:'Phone',fieldName :'Phone',cellAttributes:{ iconName: 'standard:call'}},
        {label:'Account Name',fieldName :'AccountUrl',type:'url',typeAttributes:{label:{fieldName : 'AccountName'},target:'_blank'}},
        {label:'Email',fieldName :'Email',cellAttributes:{iconName: 'standard:email'}},
        {type:'action',typeAttributes : {rowActions : this.getRowActions}},
    ]

    getRowActions(row,doneCallback){
        const actions = [
            {label:'Edit',iconName :'utility:edit', name:'edit'},
            {label:'Delete',iconName :'utility:delete', name:'delete'},
        ];
        doneCallback(actions);
    }

    @wire(getAllContacts,{searchKey:'$searchContact'})
    contactsList(result){
        this.wiredContacts = result;
        const {data,error} = result;
        if(data){
            //Ref : https://www.youtube.com/watch?v=mWLJkOYb7lg&list=PLpEq6cFuSkoEy1MYR25DPbcrunBCGci9O&index=2
            //To fetch the Account Name which is in the Array of Objects returned. 
            //But it is available in the 2nd layer of the data fetched. So we need to map the original array
            //so loop the array values one by one and get the data.
            this.contacts = data.map(contact=>{
                let flatContact = {...contact};
                flatContact.AccountName = contact.Account.Name;
                flatContact.AccountUrl = `/lightning/r/Account/${contact.AccountId}/view`;
                console.log(JSON.stringify(flatContact));
                return flatContact;
            });

            console.log(JSON.stringify(this.contacts));
            this.error = undefined;
        }
        if(error){
            this.error = error;
            this.contacts = undefined;
        }
    }
    handleSearch(event){
        this.searchContact = event.target.value;
    }
    handleCreate(event){
        this.isModalOpen = true;
        this.editRecordId = null;
    }
    handleSelectedRows(event){
        const allSelected = event.detail.selectedRows;
        this.selectedRows = allSelected;
    }

    handleBulkDelete(){
        if(this.selectedRows.length === 0){
            alert('Please Select Rows to Delete!');
            return;
        }
        //The selected Rows from DataTable will have all the vallues like Id,FName,LastName,Email,Phone etc.
        //But we want only the Id to delete the Contact. So we are mapping the array of selectedRows and getting
        //only the ContactId in a new array contactIds
        const contactIds = this.selectedRows.map(contact=> contact.Id);

        bulkDeleteContacts({conIds : contactIds})
        .then(result=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
			    message: 'Contacts Deleted Successfully!' ,
			    variant: 'success'
            }))

            this.refreshData();
        })
        .catch(error=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error Deleting the Record',
                message: error.body.message,
                variant: 'error'
            }))
        })
    }

    handleRowAction(event){
        const action = event.detail.action;
        const row = event.detail.row;

        switch(action.name){
            case 'edit':
                this.isModalOpen = true;
                this.editRecordId = row.Id;
                break;
            case 'delete':
                this.handleDelete(row.Id);
                break;
            default:
                break;
        }
    }

    handleDelete(conRecId){
        deleteRecord(conRecId)
        .then(response=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
			    message: 'Contact Deleted Successfully!' ,
			    variant: 'success'
            }))
            //refreshApex(this.wiredContacts);
            this.refreshData();
        })
        .catch(error=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error Deleting the Record',
                message: error.body.message,
                variant: 'error'
            }))
        })
    }

    closeModal(){
        this.isModalOpen = false;
    }

    successHandler(event){
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success',
            message: 'Contact Updated Successfully!' ,
            variant: 'success'
        }));
        
        this.isModalOpen = false;
        //refreshApex(this.wiredContacts);
        this.refreshData();
    }

    refreshData(){
        return this.wiredContacts ? refreshApex(this.wiredContacts) : undefined;
    }  
}