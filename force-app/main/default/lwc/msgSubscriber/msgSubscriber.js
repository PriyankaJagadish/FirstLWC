import { LightningElement,wire } from 'lwc';
import SAMPLEMSGCH from'@salesforce/messageChannel/SimpleMessageChannel__c';    
import {APPLICATION_SCOPE, publish, subscribe, unsubscribe, MessageContext} from 'lightning/messageService';

export default class MsgSubscriber extends LightningElement {

    messageReceived;

    @wire(MessageContext)
    context;

    connectedCallback(){
        this.subscribeMessage();
    }

    subscribeMessage(){
        //context, channel reference, listener,subscriberoptions
        subscribe(this.context,SAMPLEMSGCH,(message)=>{this.handleMessage(message)},{scope:APPLICATION_SCOPE})
    }
    handleMessage(message){
        this.messageReceived = message.lmsData.value? message.lmsData.value:'No Message Published';
    }
}