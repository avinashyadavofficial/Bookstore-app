// ✅ wishlist.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopbarComponent } from "../topbar/topbar.component";
import { FooterComponent } from "../footer/footer.component";
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [TopbarComponent, FooterComponent, CommonModule, MatIconModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  isLoggedIn = false;
  wishlistItems: any[] = [];

  constructor(private router: Router, private wishlistService: WishlistService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    this.isLoggedIn = !!token;
    if (this.isLoggedIn) {
      this.fetchWishlist();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  fetchWishlist() {
    this.wishlistService.getWishlist().subscribe({
      next: (res: any) => {
        this.wishlistItems = res.result;
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
      }
    });
  }

  removeFromWishlist(productId: string) {
    this.wishlistService.removeWishlist(productId).subscribe(() => {
      this.fetchWishlist();
    });
  }
}