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

  tasks: Array<Task> = [];
  task : Task = {
    descricao:" " ,
    id : null
 };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
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

  delete(task): void {
    console.log(task.id);    
    this.taskService.deleteTask(task.id).subscribe(data => {
      console.log('em delete safado'+this.tasks  );
      this.tasks = this.tasks.filter(u => u !== task);
    });
  }
}
