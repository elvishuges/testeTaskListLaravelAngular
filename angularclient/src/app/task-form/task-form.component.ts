import { Component, OnInit } from "@angular/core";
import { TaskService } from "../task.service";
import { TaskListComponent } from "../task-list/task-list.component";
import { Task } from "../task";

@Component({
  selector: "app-task-form",
  providers: [TaskListComponent],
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.scss"]
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    descricao: " ",
    id: null
  };

  constructor(
    private list: TaskListComponent,
    private taskService: TaskService
  ) {}

  ngOnInit() {}

  addTask() {
    if (this.task.descricao == "") {
      alert("Tarefa sem descrição !!!");
      return;
    }
    this.taskService.addTask(this.task).subscribe(res => {     
      
      console.log(res.json().id);
      this.taskService.getTasks().subscribe((item: Task[]) => {
        console.log(item);
           
        const taskAux = <Task>{
          descricao: res.json().descricao,
          id: res.json().id
        };
        this.taskService.newTaskSubject.next(taskAux);
        this.task.descricao = ""
        alert(" teste Tarefa adicionada com sucesso");    
      });
    });
  }

  // this.data.getTasks().subscribe( (item: Task[])  => {
  //   this.list.items = item;
  //   console.log('aqui');
  //   console.log(this.list.items);
  // })
}
