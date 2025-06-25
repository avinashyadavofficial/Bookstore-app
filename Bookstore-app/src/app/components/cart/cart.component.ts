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
  standalone: true,
  imports: [CommonModule, TopbarComponent, FooterComponent, FormsModule]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  grandTotal: number = 0;
  showAddressSection = false;
  showOrderSummarySection = false;

  addresses: any[] = [];

  userDetails = {
    fullName: '',
    phone: ''
  };

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCartItems();
    this.loadUserData();
    this.loadAddressData();
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

  loadUserData() {
    const userData = localStorage.getItem('userDetails');
    if (userData) {
      const user = JSON.parse(userData);
      this.userDetails.fullName = user.fullName || '';
      this.userDetails.phone = user.phone || '';
    }
  }

  loadAddressData() {
    const stored = localStorage.getItem('addresses');
    if (stored) {
      this.addresses = JSON.parse(stored).map((addr: any) => ({
        ...addr,
        isEditing: false
      }));
    } else {
      this.addresses = [this.getEmptyAddress()];
    }
  }

  getEmptyAddress() {
    return {
      fullAddress: '',
      city: '',
      state: '',
      type: 'Home',
      isEditing: true
    };
  }

  toggleAddressEdit(index: number) {
    const current = this.addresses[index];
    if (current.isEditing) {
      // Save updated addresses to localStorage
      localStorage.setItem('addresses', JSON.stringify(this.addresses));
    }
    this.addresses[index].isEditing = !current.isEditing;
  }

  addNewAddress() {
    this.addresses.push(this.getEmptyAddress());
  }

  placeOrderClicked() {
    this.showAddressSection = true;
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

  toggleAddressSection() {
    this.showAddressSection = true;
    this.showOrderSummarySection = false;
  }

  toggleOrderSummarySection() {
    this.showAddressSection = true;
    this.showOrderSummarySection = true;
  }
}
