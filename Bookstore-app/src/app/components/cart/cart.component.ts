import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from "../topbar/topbar.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule, TopbarComponent, FooterComponent, FormsModule]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  grandTotal:number=0;
  showAddressSection = false;
  showOrderSummarySection = false;

  userDetails = {
    fullName: 'Avinash Yadav',
    phone: '9889988998',
    addressType: 'Home',
    fullAddress: 'ABC,UP,India',
    city: 'Lucknow',
    state: 'Uttar Pradesh'
  };

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCartItems();
  }

  fetchCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (res: any) => {
        this.cartItems = res.result;
        this.calculateTotalPrice();
      },
      error: (err) => {
        console.error('Failed to load cart items', err);
      }
    });
  }



  placeOrderClicked() {
    this.showAddressSection = true;
  }

  removeItem(cartItemId: string) {
    this.cartService.removeCartItem(cartItemId).subscribe(() => {
      this.fetchCartItems();
    });
  }

  updateQuantity(cartItemId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(cartItemId);
    } else {
      this.cartService.updateQuantity(cartItemId, quantity).subscribe(() => {
        this.fetchCartItems();
      });
    }
  }

  continueClicked() {
    this.showOrderSummarySection = true;
  }

  checkout() {
    const payload = {
      orders: this.cartItems.map(item => ({
        product_id: item.product_id._id,
        product_name: item.product_id.bookName,
        product_quantity: item.quantityToBuy,
        product_price: item.product_id.discountPrice
      }))
    };

    this.cartService.placeOrder(payload).subscribe({
      next: (res: any) => {
        console.log('Checkout response:', res); 
        const orderId = res?.result?.[0]?._id || '#123456';
        localStorage.setItem('lastOrderId', orderId);
        this.router.navigate(['/order-success']);
      },
      error: (err) => console.error('Checkout failed', err)
    });
  }

  toggleAddressSection() {
    this.showAddressSection = true;
    this.showOrderSummarySection = false;
  }

  toggleOrderSummarySection() {
    this.showAddressSection = true;
    this.showOrderSummarySection = true;
  }
changeQty(item: any, qty: number) {
  if (qty <= 0) {
    this.removeItem(item._id);
  } else {
    this.cartService.updateQuantity(item._id, qty).subscribe(() => {
      this.fetchCartItems();
    });
  }
}

  calculateTotalPrice() {
    this.totalPrice = 0;
    this.grandTotal = 0;

    this.cartItems.forEach(item => {
      const itemTotal = item.quantityToBuy * item.product_id.discountPrice;
      this.totalPrice += itemTotal;
      this.grandTotal += itemTotal;
    });
  }
}
