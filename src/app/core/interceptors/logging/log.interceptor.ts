import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Outgoing request to ${req.url}`);
    return next.handle(req).pipe(
      tap(
        event => {
          console.log(`Incoming response from ${req.url}`, event);
        },
        error => {
          console.log(`Error response from ${req.url}`, error);
        }
      )
    );
  }
}