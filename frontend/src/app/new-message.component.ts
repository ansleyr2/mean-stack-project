import { Component, Output, EventEmitter } from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'new-message',
  template: ` <mat-card class="card">
    <mat-card-content>
      <form class="example-form">
        <mat-form-field class="example-full-width">
          <textarea
            [(ngModel)]="message.text"
            matInput
            placeholder="Message"
            name="messsage"
          ></textarea>
        </mat-form-field>
      </form>
      <mat-card-actions>
        <button (click)="post()" mat-button color="primary">POST</button>
      </mat-card-actions>
    </mat-card-content>
  </mat-card>`,
})
export class NewMessageComponent {
  @Output() onPosted = new EventEmitter();

  constructor(private webService: WebService, private auth: AuthService) {}

  message = {
    owner: this.auth.getName(),
    text: '',
  };

  post() {
    console.log(this.message);
    this.webService.postMessages(this.message).subscribe(
      (data) => {
        console.log(data);
        this.onPosted.emit(this.message);
      },
      (err) => {
        console.log(err);
        this.webService.handleError('Error posting message');
      }
    );
  }
}
