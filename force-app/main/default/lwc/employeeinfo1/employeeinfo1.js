import { LightningElement,track } from 'lwc';

export default class Employeeinfo1 extends LightningElement {
    count = 0;
    @track selectedEmployee = [];
    @track employees = [];
    isEmpAvailable;
    isRecAvailable;
    result;
    async getData(){
        this.employees = [];
        this.isEmpAvailable = false;    
        let url = 'https://sfdev36-dev-ed.my.salesforce-sites.com/services/apexrest/employees';
        try{
            let response = await fetch(url,{method:"GET"})
            let data = await response.json();
            data.employee.forEach(emp => {
                console.log(emp);
                this.employees.push(emp);
                });
            }
        catch(e){
            console.log(e);
        }   
    }

    handleClick(event){
        if(event.target.name == 'Next'){
            this.isRecAvailable = true;
            this.selectedEmployee = [];
            this.count += 1;
            console.log(this.count);
            if(this.count !== this.employees.length) {
                this.selectedEmployee.push(this.employees[this.count]);    
            }  
        }
        else if(event.target.name == 'Previous'){   
            this.isRecAvailable = true; 
            this.selectedEmployee = [];
            this.count -= 1;
            console.log(this.count);
            if(!(this.count < 0)){
                this.selectedEmployee.push(this.employees[this.count]); 
            }
        }
        if (this.selectedEmployee.length !== 0){
            this.isEmpAvailable = true;
        }
        else{
            this.isRecAvailable = false;
            this.result = "Sorry! No more records to Display!";
        }
    }
}