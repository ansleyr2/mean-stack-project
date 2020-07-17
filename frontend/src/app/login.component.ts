import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  constructor(public authService: AuthService) {}

  loginData = {
    email: '',
    password: '',
  };

  login() {
    console.log(this.loginData);
    this.authService.login(this.loginData);
  }
}
