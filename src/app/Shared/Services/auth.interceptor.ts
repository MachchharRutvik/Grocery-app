import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // console.log("interceptor")
    if (request.url.includes('http://localhost:3000/cart')) {
      return next.handle(request); // Skip the interceptor for this request
    }
    const token = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          token: token,
        },
      });
    } 
      // console.log(request);
    return next.handle(request);
  }
}
