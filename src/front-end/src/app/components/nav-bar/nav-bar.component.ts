import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from 'src/app/entity/user';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  storage: Storage = sessionStorage;
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.auth.getAccessTokenSilently().subscribe((token) => {
      this.storage.setItem('token', token);
    });
    this.auth.user$.subscribe((user) => {
      this.setUserInStorage(user);
    });
    const user: User = JSON.parse(this.storage.getItem('user') || '{}');
    this.taskService.getTasks(user);
  }

  private setUserInStorage(
    user: import('@auth0/auth0-angular').User | null | undefined
  ) {
    const loggedInUser = new User();
    const userId = user?.sub || '';
    loggedInUser.id = userId.replace('auth0|', '');
    loggedInUser.name = user?.name || '';
    this.storage.setItem('user', JSON.stringify(loggedInUser));
  }
}
