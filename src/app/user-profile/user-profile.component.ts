import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  constructor(private _authService: AuthService) {}
  logOut() {
    this._authService.logOut();
  }

  newData: any = {};
  name: string = '';
  email: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  rePassword: string = '';

  saved: boolean = true;
  show = false;
  saveChanges() {
    if (!this.name || !this.email) return;
    this.newData = {
      name: this.name,
      email: this.email,
    };
    setTimeout(() => {
      this.show = false;
    }, 2000);
    this.saved = false;
    this.show = true;
  }
  edit() {
    this.saved = true;
  }
}
