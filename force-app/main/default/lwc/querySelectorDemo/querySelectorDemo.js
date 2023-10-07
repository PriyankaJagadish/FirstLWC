import { LightningElement } from 'lwc';

export default class QuerySelectorDemo extends LightningElement {
    employees = [
        {
            id: 101,
            name: "John",
            salary: 50000
        },
        {
            id: 102,
            name: "Sam",
            salary: 40000
        },
        {
            id: 103,
            name: "Mathew",
            salary: 30000
        }
    ]

    handleSelect(event){
        const empno = event.target.dataset.empno;
        const empname = event.target.dataset.empname;
        alert(`Code = ${empno} and Name = ${empname}`);
    }
    handleClear(event){
        const empno = event.target.dataset.empno;
        this.template.querySelector(`lightning-input[data-empno = '${empno}']`).value=""; 
        //template literal is used as the value has to be in a ' '
    }
    handleClearFirst(){
        this.template.querySelector("lightning-input[data-empno = '101']").value=""; 
        // data attribute will be passed as a string so using in ' ' for id 

    }
    handleClearAll(event){
        Array.from(this.template.querySelectorAll("lightning-input")).forEach(ele => ele.value="");
    }
}