import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MessageComponent } from './messages.component';
import { NewMessageComponent } from './new-message.component';
import { NavComponent } from './nav.component';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { UserComponent } from './user.component';

import { WebService } from './web.service';
import { AuthService } from './auth.service';

var routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'messages',
    component: MessageComponent,
  },
  {
    path: 'messages/:name',
    component: MessageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    NewMessageComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),
  ],
  providers: [WebService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
