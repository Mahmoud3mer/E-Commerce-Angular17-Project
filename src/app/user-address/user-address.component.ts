import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-address',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-address.component.html',
  styleUrl: './user-address.component.css',
})
export class UserAddressComponent {
  activeAdressForm: boolean = false;
  countery: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
  full: string = '';
  saved: boolean = false;

  address: any = {};
  addAddress() {
    this.activeAdressForm = true;
    this.saved = false;
  }
  saveAddress() {
    this.address = {
      countery: this.countery,
      city: this.city,
      state: this.state,
      zip: this.zip,
      full: this.full,
    };
    this.saved = true;
    this.activeAdressForm = false;
  }
}
