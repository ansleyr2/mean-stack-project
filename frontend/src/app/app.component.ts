import { Component, ViewChild } from '@angular/core';
import { NavComponent } from './nav.component';

@Component({
  selector: 'app-root',
  template: ` <nav></nav>
    <router-outlet></router-outlet>`,
})
export class AppComponent {}
