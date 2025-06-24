import { Component, Input, OnInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule, MatDividerModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @Input() showSearch: boolean = true;
  @Input() showProfile: boolean = true;
  @Input() showCart: boolean = true;

  isLoggedIn: boolean = false;
  userName: string = '';
  cartCount = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');

      if (token && user) {
        this.isLoggedIn = true;
        this.userName = JSON.parse(user).fullName;
      } else if (token) {
        this.isLoggedIn = true;
        this.userName = 'User';
      }

      this.cartService.getCartCountObservable().subscribe(count => {
        this.cartCount = count;
      });
      this.cartService.updateCartCount();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  navigateToOrders() {
    this.router.navigate(['/my-orders']);
  }

  navigateToWishlist() {
    this.router.navigate(['/wishlist']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
