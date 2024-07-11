import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { TodoTask } from 'src/app/entity/todo-task';
import { TaskService } from 'src/app/services/task.service';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { User } from 'src/app/entity/user';
import { DOCUMENT } from '@angular/common';
import { DeleteTaskModalComponent } from '../delete-task-modal/delete-task-modal.component';

@Component({
  selector: 'app-all-users-tasks',
  templateUrl: './all-users-tasks.component.html',
  styleUrls: ['./all-users-tasks.component.css'],
})
export class AllUsersTasksComponent implements OnInit {
  tasks: TodoTask[] = [];
  storage: Storage = sessionStorage;
  user: User = new User();
  isAuthenicated: boolean = false;
  @ViewChild('taskModal') taskModal!: TaskModalComponent;
  @ViewChild('deleteTaskModal') deleteTaskModal!: DeleteTaskModalComponent;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.storage.getItem('user') || '{}');
    this.updateTaskList();
  }

  updateTaskList() {
    this.taskService.getTasks(this.user).subscribe((taskList) => {
      this.tasks = taskList;
    });
  }

  handleSave(task: TodoTask) {
    if (task.id === 0) {
      //new task
      this.taskService.createTask(task).subscribe((savedTask: TodoTask) => {
        this.tasks.push(savedTask);
      });
    } else {
      this.taskService
        .updateTask(task)
        .subscribe((savedTask: TodoTask) => this.updateTaskOnList(savedTask));
    }
  }
  updateTaskOnList(updatedTask: TodoTask) {
    const foundTask = this.tasks.find((task) => updatedTask.id === task.id);
    if (foundTask) {
      Object.assign(foundTask, updatedTask);
    }
  }

  handleDelete(deletedTask: TodoTask) {
    this.taskService.deleteTask(deletedTask).subscribe();
    console.log('Done!');
    //Remove task from list, without making a get request to the server
    const taskToDeleteIndex = this.tasks.findIndex(
      (task) => task.id === deletedTask.id
    );
    this.tasks.splice(taskToDeleteIndex, 1);
  }
}
