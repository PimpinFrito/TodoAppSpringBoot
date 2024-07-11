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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-delete-task-modal',
  templateUrl: './delete-task-modal.component.html',
  styleUrls: ['./delete-task-modal.component.css'],
})
export class DeleteTaskModalComponent implements OnInit {
  @Input() task: TodoTask = new TodoTask();
  @Output() delete = new EventEmitter<TodoTask>();
  @ViewChild('content') content!: TemplateRef<any>;
  storage: Storage = sessionStorage;

  constructor(
    private modalService: NgbModal,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && changes['task'].currentValue) {
      this.task = changes['task'].currentValue;
    }
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openModalDeleteTask(task: TodoTask = new TodoTask()) {
    this.task = task;
    this.open(this.content);
  }

  deleteTask() {
    this.delete.emit(this.task);
    this.modalService.dismissAll();
  }
}
