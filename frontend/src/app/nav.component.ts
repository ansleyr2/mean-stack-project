import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'nav',
  template: ` <mat-toolbar color="primary">
    <button mat-button routerLink="/">Message Board</button>
    <button mat-button routerLink="/messages">Messages</button>
    <span style="flex: 1 1 auto;"></span>
    <button *ngIf="!authService.isAuthenticated" mat-button routerLink="/login">
      Login
    </button>
    <button
      *ngIf="!authService.isAuthenticated"
      mat-button
      routerLink="/register"
    >
      Register
    </button>
    <button *ngIf="authService.isAuthenticated" mat-button routerLink="/user">
      Welcome {{ authService.getName() }}
    </button>
    <button
      *ngIf="authService.isAuthenticated"
      mat-button
      (click)="authService.logout()"
    >
      Logout
    </button>
  </mat-toolbar>`,
})
export class NavComponent {
  constructor(public authService: AuthService) {}
}
