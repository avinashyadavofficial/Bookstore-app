import { Component, OnInit, Inject } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { TopbarComponent } from "../topbar/topbar.component";
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [FooterComponent, TopbarComponent, FormsModule],
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private router:Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
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
  }

  togglePersonalEdit(): void {
    this.isEditingPersonal = !this.isEditingPersonal;
  }

  toggleAddressEdit(): void {
    this.isEditingAddress = !this.isEditingAddress;
  }
  navigateToHome(){
    this.router.navigate(['/home']);
  }
}
