import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-not-signed-in',
  templateUrl: './not-signed-in.component.html',
  styleUrls: ['./not-signed-in.component.css'],
})
export class NotSignedInComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated$) {
      this.router.navigate(['/tasks']);
    }
  }
}
