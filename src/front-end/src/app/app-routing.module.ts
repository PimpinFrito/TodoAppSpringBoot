import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersTasksComponent } from './components/all-users-tasks/all-users-tasks.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { LoginGuard } from './guards/login.guard';
import { NotSignedInComponent } from './components/not-signed-in/not-signed-in.component';

const routes: Routes = [
  {
    path: '',
    component: AllUsersTasksComponent,
    canActivate: [LoginGuard],
  },
  { path: 'not-signed-in', component: NotSignedInComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
