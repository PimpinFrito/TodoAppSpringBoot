import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthIntercepterService implements HttpInterceptor {
  securedEndPoints = [environment.backendUrl + '/tasks'];
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.auth.isAuthenticated$ &&
      this.securedEndPoints.some((url) => req.urlWithParams.includes(url))
    ) {
      return from(this.auth.getAccessTokenSilently()).pipe(
        mergeMap((token) => {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(authReq);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
