import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { TopbarComponent } from "../topbar/topbar.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  imports: [FooterComponent, TopbarComponent,FormsModule],
})
export class UserProfileComponent implements OnInit {
  personal = {
    fullName: '',
    email: '',
    password: '********',
    mobileNumber: '',
  };

  address = {
    fullAddress: '',
    city: '',
    state: '',
    addressType: 'Home'
  };

  isEditingPersonal: boolean = false;
  isEditingAddress: boolean = false;

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.personal.fullName = user.fullName || '';
      this.personal.email = user.email || '';
      this.personal.mobileNumber = user.phone || '';

      if (user.address && user.address.length > 0) {
        const addr = user.address[0];
        this.address.fullAddress = addr.fullAddress || '';
        this.address.city = addr.city || '';
        this.address.state = addr.state || '';
        this.address.addressType = addr.addressType || 'Home';
      }
    }
  }

  togglePersonalEdit(): void {
    this.isEditingPersonal = !this.isEditingPersonal;
  }

  toggleAddressEdit(): void {
    this.isEditingAddress = !this.isEditingAddress;
  }
}
