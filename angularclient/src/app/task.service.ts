import { Injectable } from '@angular/core';
import { Task } from './task';
import { Http } from '@angular/http'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class TaskService { 
  
  laravel_URL_API: string = 'http://localhost:8000/tasks';
  public newTaskSubject = new Subject<any>();
  constructor(private http:Http,private httpClient: HttpClient) {
  
 }

getTasks(){
  console.log('em getTask Task service')
  return this.http.get(this.laravel_URL_API)
  .pipe(map(res => res.json()));
}

addTask(task:Task){  
  return this.http.post(this.laravel_URL_API, task);   
}

updateTask(id:number,task:Task){
  //return this.http.put(this.laravel_URL_API, task);
  return this.http.put(`${this.laravel_URL_API}/${id}`,task);  
}

deleteTask(id:number){ // eu fiz
  console.log('em Delete..');  
  return this.http.delete(`${this.laravel_URL_API}/${id}`);  
}
}