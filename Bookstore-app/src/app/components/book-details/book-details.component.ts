import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book/book.service';
import { CartService } from '../../services/cart/cart.service';
import { TopbarComponent } from "../topbar/topbar.component";
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { HttpService } from '../../services/http_service/http-service.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  imports: [TopbarComponent, CommonModule, FormsModule, MatIconModule],
  standalone: true
})
export class BookDetailsComponent implements OnInit {
  book: any;
  quantity = 1;
  inCart = false;
  bookId: string | null = null;
  cartItemId: string = '';
  feedbacks: any[] = [];
  newComment: string = '';
  newRating: number = 0;
  isActive = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('bookId');

    this.bookService.getBooks().subscribe((res: any) => {
      const books = res.result;
      this.book = books.find((b: any) => b._id === this.bookId);
    });

    if (this.bookId) {
      this.fetchFeedbacks();
    }
  }

  addToCart() {
  if (!this.book || !this.book._id) {
    console.error("Book is not loaded yet.");
    return;
  }

  this.cartService.addToCart(this.book._id).subscribe({
    next: (res: any) => {
      this.inCart = true;
      this.cartItemId = res.result._id;
      this.cartService.updateCartCount();
    },
    error: (err) => console.error("Add to cart failed:", err)
  });
}


  addToWishlist() {
    if (this.isActive) return; // Prevent duplicate wishlist additions

    const productId = this.book._id;
    this.wishlistService.addWishlist(productId).subscribe({
      next: (res: any) => {
        console.log('Added to wishlist', res);
        this.isActive = true;
      },
      error: (err: any) => {
        console.error('Error adding to wishlist', err);
      }
    });
  }

  increment() {
    this.quantity++;
    if (this.cartItemId) {
      this.cartService.updateQuantity(this.cartItemId, this.quantity).subscribe({
        next: () => this.cartService.updateCartCount(),
        error: (err) => console.error('Error updating quantity', err)
      });
    }
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      if (this.cartItemId) {
        this.cartService.updateQuantity(this.cartItemId, this.quantity).subscribe({
          next: () => this.cartService.updateCartCount(),
          error: (err) => console.error('Error updating quantity', err)
        });
      }
    }
  }

  fetchFeedbacks() {
    this.http.getApi(`get/feedback/${this.bookId}`).subscribe({
      next: (res: any) => {
        this.feedbacks = (res.result).reverse();
      },
      error: (err) => console.error("Error fetching feedbacks:", err)
    });
  }

  submitFeedback() {
    if (!this.newComment || !this.newRating) return;

    const body = {
      comment: this.newComment,
      rating: this.newRating
    };

    this.http.postApi(`add/feedback/${this.bookId}`, body).subscribe({
      next: () => {
        this.newComment = '';
        this.newRating = 0;
        this.fetchFeedbacks();
      },
      error: (err) => console.error("Feedback submission error:", err)
    });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
