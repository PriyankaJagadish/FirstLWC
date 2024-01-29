import { LightningElement,track,wire } from 'lwc';
import getUsers from '@salesforce/apex/UserController.getUsers';
import getAccountsOnUser from '@salesforce/apex/AccountController.getAccountsOnUser';
import getContactsOnUser from '@salesforce/apex/ContactController.getContactsOnUser';
import contact from './Contact.html';
import account from './Account.html';
import mainTemplate from './displayAccountContactOnUser.html';

export default class DisplayAccountContactOnUser extends LightningElement {
    userInput = '';
    userList;
    accountList;
    contactList;
    @track userObject=[];
    selectedUser;
    userColumnsList = [
        {label: 'Id', fieldName : "Id"},
        {label: 'Name', fieldName : "Name"},
    ]
    contactColumnsList = [
        {label:'First Name',fieldName : "FirstName"},
        {label:'Last Name',fieldName : "LastName"},
        {label:'Phone',fieldName : "Phone"},
        {label:'Email',fieldName : "Email"},
    ]
    accountColumnList = [
        {label:'Id',fieldName : "Id"},
        {label:'Account Name',fieldName : "Name"},
        {label:'Rating',fieldName : "Rating"},
    ]

    @wire(getUsers)
    userHandler({data,error}){
        if(data){
            this.userList = data;
            for(var key in data){
                console.log(JSON.stringify({label:key,value:data[key]}));
                this.userObject.push({label:data[key].Name,value:data[key].Id});
            }
        }
        if(error){
            console.log(error);
            this.error = error;
        }
    }

    handleChange(event){
        this.selectedUser = event.detail.value;
    }
    getAccounts(event){
        this.userInput = event.target.label;
        getAccountsOnUser({userId : this.selectedUser})
        .then(result=>{
            this.accountList = result;
        })
        .catch(error=>{
            console.log(error);
        })
    }
    getContacts(event){
        this.userInput = event.target.label;
        getContactsOnUser({userId:this.selectedUser})
        .then(result=>{
            this.contactList = result;
        })
        .catch(error=>{
            console.log(error);
        })
    }
    render(){
        return this.userInput === "Fetch Accounts" ? account : this.userInput === "Fetch Contacts" ? contact : mainTemplate ;
    }
    handleBack(){
        this.userInput = '';
    }
}