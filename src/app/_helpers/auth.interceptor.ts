import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Observable } from "rxjs";
import { StorageService } from "../_services/storage.service";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = req;
    const token = this.storage.getToken();
    if (token != null) {
      authRequest = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
      })
    }
    return next.handle(authRequest);
  }

}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
];
