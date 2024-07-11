import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AllUsersTasksComponent } from './components/all-users-tasks/all-users-tasks.component';
import { provideAuth0 } from '@auth0/auth0-angular';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { TaskListPaginationComponent } from './components/task-list-pagination/task-list-pagination.component';
import { NotSignedInComponent } from './components/not-signed-in/not-signed-in.component';
import { AuthIntercepterService } from './services/auth-intercepter.service';
import { DeleteTaskModalComponent } from './components/delete-task-modal/delete-task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AllUsersTasksComponent,
    TaskModalComponent,
    TaskListPaginationComponent,
    NotSignedInComponent,
    DeleteTaskModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAuth0(environment.auth_config),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercepterService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
