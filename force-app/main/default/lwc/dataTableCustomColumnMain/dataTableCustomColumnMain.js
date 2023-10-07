import { LightningElement } from 'lwc';

export default class DataTableCustomColumnMain extends LightningElement {

    columnsList=[
           {label: 'Id',fieldName :'Id'},
           {label: 'Name',fieldName :'Name'},
           {label: 'Progress',fieldName :'Score', type :'progRing'}  
    ]

    data=[
        {'Id' : 101, 'Name' : 'ABC', 'Score' : '80'},
        {'Id' : 102, 'Name' : 'DEF', 'Score' : '50'},
        {'Id' : 103, 'Name' : 'GHI', 'Score' : '30'}
    ]
}