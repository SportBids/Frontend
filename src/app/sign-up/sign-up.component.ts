import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: any = {
    username:null,
    email:null,
    password: null,
    firstName:null,
    lastName:null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit():void {
    const {username, email, password, firstName, lastName} = this.form;

    this.authService
      .signUp(username,password,email,firstName,lastName)
      .subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;

          this.storageService.saveToken(data.AccessToken)
          this.storageService.saveUser(data);

          this.goToHome();
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
  }

  goToHome(): void {
    this.router.navigate([''],);
  }
}
