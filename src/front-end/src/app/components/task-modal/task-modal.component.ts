import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TodoTask } from 'src/app/entity/todo-task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
})
export class TaskModalComponent implements OnInit {
  @Input() task: TodoTask = new TodoTask();
  @Output() save = new EventEmitter<TodoTask>();
  @ViewChild('content') content!: TemplateRef<any>;
  taskForm!: FormGroup;
  storage: Storage = sessionStorage;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.task.title, Validators.required],
      description: [this.task.description],
      dueDate: [this.task.dueDate],
      completed: [this.task.completed],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && changes['task'].currentValue) {
      this.taskForm?.patchValue(this.task);
    }
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openModalEditTask(task: TodoTask) {
    this.task = task;
    this.taskForm.patchValue(task);
    this.open(this.content);
  }

  openModalCreateTask() {
    const task = new TodoTask();
    task.user = JSON.parse(this.storage.getItem('user') || '');
    this.openModalEditTask(task);
  }

  saveTask() {
    if (this.taskForm.valid) {
      // Update task with form values
      Object.assign(this.task, this.taskForm.value);
      this.save.emit(this.task);
      this.modalService.dismissAll();
    }
  }
}
