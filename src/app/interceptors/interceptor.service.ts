import { Injectable } from '@angular/core';
import {
   HttpInterceptor,
   HttpHandler,
   HttpRequest,
} from '@angular/common/http';

@Injectable()
export class Interceptor implements HttpInterceptor {
   intercept(req: HttpRequest<any>, next: HttpHandler) {
      let request: HttpRequest<any> = req;

      if (localStorage.getItem('token')) {
         request = req.clone({
            headers: req.headers.set(
               'Authorization',
               `Bearer ${localStorage.getItem('token')}`
            ),
         });
      }
      return next.handle(request);
   }
}
