import { Component, ViewChild } from '@angular/core';
import { MessageComponent } from './messages.component';
import { NewMessageComponent } from './new-message.component';

@Component({
  selector: 'home',
  template: ` <new-message (onPosted)="onPosted($event)"></new-message>
    <messages></messages>`,
  styleUrls: ['./app.component.css'],
})
export class HomeComponent {
  title = 'my frontend';

  @ViewChild(MessageComponent) messages: MessageComponent;

  onPosted(message) {
    console.log(message);
    this.messages.messages.push(message);
  }
}
