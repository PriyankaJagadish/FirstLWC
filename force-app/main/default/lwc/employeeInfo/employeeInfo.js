import { LightningElement,track } from 'lwc';

export default class EmployeeInfo extends LightningElement {
    fname;
    @track filteredEmployees = [];
    @track employees = [];
    isEmpAvailable = false;
    async getData(){
        this.isEmpAvailable = false;
        this.employees = [];
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

    handleChange(event){
        this.fname = event.target.value;
    }

    handleClick(event){
        if(event.target.name == 'Search'){
            this.filteredEmployees = [];
            this.filteredEmployees = this.employees.filter(emp => (emp.Name == this.fname));     
        }
        console.log(this.fname);
        if (this.filteredEmployees.length !== 0){
            this.isEmpAvailable = true;
        }
        else{
            this.isEmpAvailable = false;
        }
    }
}