import { Injectable } from '@angular/core';

const ACCESS_TOKEN_KEY = 'access-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token:string):void {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
