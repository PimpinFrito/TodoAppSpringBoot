import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoTask } from '../entity/todo-task';
import { environment } from 'src/environments/environment';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = environment.backendUrl + '/tasks';
  storage: Storage = sessionStorage;

  constructor(private http: HttpClient) {}

  getTasks(user: User) {
    const getUserTasksUrl = this.url + `/findByUser?userId=${user.id}`;
    return this.http.get<TodoTask[]>(getUserTasksUrl);
  }

  updateTask(task: TodoTask) {
    return this.http.put<TodoTask>(this.url, task);
  }

  createTask(task: TodoTask) {
    return this.http.post<TodoTask>(this.url, task);
  }
  deleteTask(task: TodoTask) {
    return this.http.delete(this.url + `/${task.id}`);
  }
}
