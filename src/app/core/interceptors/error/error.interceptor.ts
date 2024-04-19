import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    
    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse) =>{
        let errorMessage='Hata oluştu.';
        if (error.error){
          errorMessage=`Hata Kodu: ${error.status}, Message ${error.error.message}`;
        }if (error instanceof HttpResponse){
          console.error('Sunucu Hatası!',error.status);
        }else{
          console.error('Bir hata oluştu:',error);
        }
        return throwError(errorMessage);
      })
      );   
  }
}
