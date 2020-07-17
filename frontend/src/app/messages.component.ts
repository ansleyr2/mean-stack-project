import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'messages',
  template: `<div *ngFor="let message of messages">
    <mat-card class="card">
      <mat-card-title
        [routerLink]="['/messages', message.owner]"
        style="cursor:pointer;"
        >{{ message.owner }}</mat-card-title
      >
      <mat-card-content> {{ message.text }} </mat-card-content>
    </mat-card>
  </div>`,
  styleUrls: ['./app.component.css'],
})
export class MessageComponent {
  constructor(private webService: WebService, private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.snapshot.params.name);
    const name = this.route.snapshot.params.name;
    this.webService.getMessages(name).subscribe(
      (data: any) => {
        console.log(data);
        this.messages = data;
      },
      (err) => {
        console.log(err);
        this.webService.handleError('Error getting messages');
      }
    );

    this.webService.getUser().subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  messages = [];
}
