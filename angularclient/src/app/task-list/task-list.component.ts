import { Component, OnInit, Input } from "@angular/core";
import { Task } from "../task";
import { TaskService } from "../task.service";
import {Injectable} from "@angular/core";


@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"]
})

@Injectable()
export class TaskListComponent implements OnInit {
  index: number;
  id: number;
  selectedTask: string;
  tasks: Array<Task> = [];  
  task : Task = {
    descricao:" " ,
    id : null
 };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.index = 0;
    this.getTasks();
  }  
 
  getTasks(): void {
    console.log('em getTask task list');
    this.taskService
      .getTasks()
      .subscribe(
        resultArray => (this.tasks = resultArray),
        error => console.log("Error :: " + error)
      );
      this.taskService.newTaskSubject.subscribe(
        data => this.tasks.push(data)   
      )
      
  }
  
  editTask(task) :void{
    console.log("worked" + task.id);
    this.index = task.id;   
    this.id = task.id;
    this.selectedTask = task.descricao;
  }

  cancleEdit(task):void {
    this.index = 0;
  }

  atualizarTask(task):void{

    const taskAux = <Task>{
      descricao: this.selectedTask,
      id: this.id
    };
    console.log('Aux:')
    console.log(taskAux);
    console.log('-----');
    console.log(task);
    this.taskService.updateTask(taskAux);    
  }

  delete(task): void {
    console.log(task.id);    
    this.taskService.deleteTask(task.id).subscribe(data => {
      console.log('em delete safado'+this.tasks);
      this.tasks = this.tasks.filter(u => u !== task);
    });
  }
}
