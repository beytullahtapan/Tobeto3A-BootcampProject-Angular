import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, filter, of, tap } from "rxjs";

@Injectable()
export class CachingInterceptor implements HttpInterceptor{
  private cache: Map<string, HttpResponse<any>> =new Map();

  intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{

    const isCachable=request.method=='GET';
    
    if(!isCachable){
      return next.handle(request);
    }
    const cacheKey=request.urlWithParams;
    const cachedResponse=this.cache.get(cacheKey);
    
    if(cachedResponse) {
      return of(cachedResponse);
  }
  return next.handle(request).pipe(
    filter((event:HttpEvent<any>)=>event instanceof HttpResponse && event.status==200),
    tap((event:HttpEvent<any>)=>{
      if (event instanceof HttpResponse){
      this.cache.set(cacheKey,event)
      }
     })
   );
  }
}