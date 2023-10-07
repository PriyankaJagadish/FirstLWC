import { LightningElement,wire } from 'lwc';
import SAMPLEMSGCH from'@salesforce/messageChannel/SimpleMessageChannel__c';    
import {APPLICATION_SCOPE, publish, subscribe, unsubscribe, MessageContext} from 'lightning/messageService';

export default class MsgPublisher extends LightningElement {
    
    message;

    @wire(MessageContext)
    context;

    handleChange(event){
        this.message = event.target.value;
    }

    handleClick(event){
        console.log('Published');
        const msg = {
            lmsData :{
                value : this.message
            }
        }

        publish(this.context,SAMPLEMSGCH,msg);
    }
}