import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Injectable()
export class WebService {
  BASE_URL = 'http://localhost:1234/api';
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ) {}

  getMessages(user) {
    user = user ? '/' + user : '';
    return this.http.get(`${this.BASE_URL}/messages${user}`);
  }

  postMessages(message) {
    return this.http.post(`${this.BASE_URL}/messages`, message);
  }

  getUser() {
    return this.http.get(`${this.BASE_URL}/users/me`, this.auth.tokenHeader);
  }

  saveUser(userData) {
    return this.http.post(
      `${this.BASE_URL}/users/me`,
      userData,
      this.auth.tokenHeader
    );
  }

  handleError(err_message) {
    this.snackBar.open(err_message, 'close', {
      duration: 2000,
    });
  }
}
