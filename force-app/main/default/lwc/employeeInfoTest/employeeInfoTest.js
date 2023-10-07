import { LightningElement,track } from 'lwc';

export default class EmployeeInfoTest extends LightningElement {
    count = 0;
    @track employees = [];
    @track result = {};

    async getData(){
        let url = 'https://sfdev36-dev-ed.my.salesforce-sites.com/services/apexrest/employees';
        try{
            let response = await fetch(url,{method:"GET"})
            let data = await response.json();
            data.employee.forEach(emp => {
                console.log(emp);
                this.employees.push(emp);
                });
            this.result = this.employees[this.count];
            }
        catch(e){
            console.log(e);
        }   
    }

    handleClick(event){
        if(event.target.name == 'Next'){
            this.count += 1;  
            if(this.count !== this.employees.length){
                this.result =  this.employees[this.count];    
            }  
        }
        else if(event.target.name == 'Previous'){   
            this.count -= 1;
            if(!(this.count < 0)){
                this.result = this.employees[this.count]; 
            }
        }
    }
}