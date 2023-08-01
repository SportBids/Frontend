import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storage: StorageService) { }

  ngOnInit(): void {
    if (this.storage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.signIn(username, password).subscribe(
      data => {
        this.storage.saveToken(data.AccessToken);
        this.storage.saveUser(data);

        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    )
  }

  reloadPage(): void {
    window.location.reload();
  }
}
