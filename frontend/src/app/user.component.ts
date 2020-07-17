import { Component } from '@angular/core';
import { WebService } from './web.service';

@Component({
  selector: 'user',
  template: ` <mat-card class="card">
    <mat-card-content>
      <form class="example-form">
        <mat-form-field class="example-full-width">
          <input
            [(ngModel)]="model.firstName"
            matInput
            placeholder="First Name"
            name="owner"
          />
        </mat-form-field>

        <mat-form-field class="example-full-width">
          <input
            [(ngModel)]="model.lastName"
            matInput
            placeholder="Last Name"
            name="messsage"
          />
        </mat-form-field>
      </form>
      <mat-card-actions>
        <button (click)="post()" mat-raised-button color="primary">
          Save Changes
        </button>
      </mat-card-actions>
    </mat-card-content>
  </mat-card>`,
})
export class UserComponent {
  constructor(private webService: WebService) {}

  model: any = {
    firstName: '',
    lastName: '',
  };

  ngOnInit() {
    this.webService.getUser().subscribe(
      (data: any) => {
        this.model.firstName = data.firstName;
        this.model.lastName = data.lastName;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  post() {
    // console.log(this.message);
    this.webService.saveUser(this.model).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
        this.webService.handleError('Error posting message');
      }
    );
  }
}
