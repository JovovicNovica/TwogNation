import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LocalStorageConst} from './localStorage-const';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem(LocalStorageConst.token)}`,
      },
    });

    return next.handle(request);
  }
}
