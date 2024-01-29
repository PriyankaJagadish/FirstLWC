import { LightningElement,wire} from 'lwc';
import getEventAttendees from '@salesforce/apex/EventAttendeesController.getEventAttendees';
import createEventAttendees from '@salesforce/apex/EventAttendeesController.createEventAttendees';
import {refreshApex} from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class EventManagement extends LightningElement {
    selectedEventId;
    availableAttendees = [];
    selectedAttendees = [];
    wiredEventAttendeesResult;
    error;
    showAttendee = false;

    handleAttendeeChange(event){
        this.selectedAttendees = event.detail.value;
    }

    handleChangeEvent(event){
        this.selectedEventId = event.detail.recordId;
        this.showAttendee = this.selectedEventId !== null;
        this.selectedAttendees = [];
    }
    @wire(getEventAttendees,{eventId : '$selectedEventId'})
    wiredEventAttendees(result){
        this.wiredEventAttendeesResult = result;
        const{data,error} = result;
        if(data){
            this.availableAttendees = data.map(contact=>({
                label: contact.Name,
                value: contact.Id
            }));
        }
        if(error){
            this.error = error; 
        }
    }

    handleSave(event){
        createEventAttendees({eventId:this.selectedEventId,selectedAttendeesId:this.selectedAttendees})
        .then(result=>{
            this.showToast('Success','Record Saved Successfully!!','Success');
            refreshApex(this.wiredEventAttendeesResult);
        })
        .catch(error=>{
            console.log(JSON.stringify(error));
            this.showToast('Error','Error Occurred While Saving Record!','Error');
        })
    }

    showToast(title,message,variant){
        const toastEvent = new ShowToastEvent({
            title : title,
            message : message,
            variant : variant,
        });
        this.dispatchEvent(toastEvent);
    }
}