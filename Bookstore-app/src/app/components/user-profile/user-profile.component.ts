import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from '../footer/footer.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    FooterComponent,
    TopbarComponent
  ]
})
export class UserProfileComponent implements OnInit {
  user = {
    fullName: '',
    email: '',
    password: '********',
    mobile: ''
  };

  addresses: any[] = [];
  isEditingPersonal = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('userDetails');
      const storedAddresses = localStorage.getItem('addresses');

      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }

      if (storedAddresses) {
        this.addresses = JSON.parse(storedAddresses);
      } else {
        this.addresses = [this.getEmptyAddress()];
      }
    }
  }

  togglePersonalEdit(): void {
    if (this.isEditingPersonal) {
      localStorage.setItem('userDetails', JSON.stringify(this.user));
    }
    this.isEditingPersonal = !this.isEditingPersonal;
  }

  toggleAddressEdit(index: number): void {
    if (this.addresses[index].isEditing) {
      localStorage.setItem('addresses', JSON.stringify(this.addresses));
    }
    this.addresses[index].isEditing = !this.addresses[index].isEditing;
  }

  addNewAddress(): void {
    this.addresses.push(this.getEmptyAddress());
    localStorage.setItem('addresses', JSON.stringify(this.addresses));
  }

  getEmptyAddress() {
    return {
      fullAddress: '',
      city: '',
      state: '',
      addressType: 'Home',
      isEditing: true
    };
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
