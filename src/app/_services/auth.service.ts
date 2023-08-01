import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.api_base_url

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API+'/auth/signin', {
      username,
      password
    }, httpOptions);
  }

  signUp(username: string, password :string, email:string, firstName:string, lastName: string): Observable<any> {
    return this.http.post(AUTH_API+'/auth/signup', {
      username,
      password,
      email,
      firstName,
      lastName
    }, httpOptions);
  }
}
