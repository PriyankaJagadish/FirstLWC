import { LightningElement, wire } from 'lwc';
import getAccountList1 from '@salesforce/apex/AccountController.getAccountList1';


export default class DataTableLWC extends LightningElement {

    columnsList = [
        {label: 'Id', fieldName : "Id"},
        {label: 'Name', fieldName : "Name"},
        {label: 'Rating', fieldName : "Rating"},
        //using Button
        /*{
            type: 'button',
            typeAttributes : {
                variant: 'Brand',
                label: 'View',
                value:'Open'
            }
        }*/
        //Using Button - icon
        /*{
            type: 'button-icon',
            typeAttributes : {
                iconName: 'action:preview'
            }
        }*/

        //Using action
        {
            type: 'action',
            typeAttributes : {
                rowActions: [
                                {label:'Show Details',name:'show_details',iconName: 'utility:preview'},
                                {label:'Remove Details',name:'remove_details',iconName: 'utility:close'}      
                ]
            }
        }
    ]


    @wire(getAccountList1)
    accountsList;
    
    handleClick(event){
        //getSelectedRows
        const rows = this.template.querySelector('lightning-datatable').getSelectedRows();
        console.log(JSON.stringify(rows));
    }
   
    handleSelect(event){
        const rows = event.detail.selectedRows;
        console.log(JSON.stringify(rows));
    }

    handleRowAction(event){
        console.log(JSON.stringify(event.detail));
        console.log(JSON.stringify(event.detail.row));
    }
}