import { User } from '@auth0/auth0-angular';

export class TodoTask {
  id: number = 0;
  title: string = '';
  description: string = '';
  dueDate: Date = new Date();
  completed: boolean = false;
  user: User = new User();
}
