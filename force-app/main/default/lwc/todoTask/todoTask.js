import { LightningElement,track } from 'lwc';

export default class TodoTask extends LightningElement {

    newTask;
    @track taskArray = [];

    handleChange(event){
        this.newTask = event.target.value;
    }

    handleClick(event){
        if(this.newTask !== ''){
            this.taskArray.push({
                id:this.taskArray.length + 1,
                name: this.newTask
            });
            this.newTask = '';
        }
    }
    deleteTask(event){
        let idToDelete = event.target.name;

        this.taskArray.splice(this.taskArray.findIndex(function(task){
            return (task.id ===  idToDelete);
        }),1);

        //dataSet
        /*if(this.taskArray.length !== 0){
            for(let i = 0 ;i<this.taskArray.length; i++){
                if(idToDelete === this.taskArray[i].id){
                    this.taskArray.splice(i,1);
                }
            }
        }*/
    }
}