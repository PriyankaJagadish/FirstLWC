import { LightningElement,track } from 'lwc';

export default class Employee extends LightningElement {
    checkSal;
    @track filteredEmployees = [];
    isEmpAvailable = false;
    @track employees = [
        {
            name : 'Steve',
            salary : 25000,
            position : 'Developer'
        },
        {
            name : 'Bergner',
            salary : 50000,
            position : 'Business Analyst'

        },
        {
            name : 'Kennedy',
            salary : 30000,
            position : 'Project Manager'
        }
    ]

   checkSalFn(sal){
    this.filteredEmployees = [];
    this.filteredEmployees = this.employees.filter(emp => emp.salary > sal)
       
        /*this.employees.forEach((emp) =>{
            if(emp.salary > sal){
                this.filteredEmployees.push(emp);
            }
        })*/
        if (this.filteredEmployees.length !== 0){
            this.isEmpAvailable = true;
        }
        else{
            this.isEmpAvailable = false;
        }
    }

    handleChange(event){
        this.checkSal = event.target.value; 
    }   

    
    handleClick(event){
        if(event.target.label === 'Get Employee Details'){
            this.checkSalFn(this.checkSal);
        }
    }
}