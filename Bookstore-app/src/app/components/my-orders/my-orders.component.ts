import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { FooterComponent } from "../footer/footer.component";
import { TopbarComponent } from "../topbar/topbar.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  imports: [FooterComponent, TopbarComponent,CommonModule]
})
export class MyOrdersComponent implements OnInit {
  orderPlacedDate: string = '';
  orders: any[] = [];

  constructor(private cartService: CartService,    private router :Router) {}

 ngOnInit(): void {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: '2-digit' };
  this.orderPlacedDate = today.toLocaleDateString('en-US', options); 

  this.cartService.getCartItems().subscribe({
    next: (res: any) => {
      this.orders = res.result || [];
    },
    error: (err) => {
      console.error('Error loading orders', err);
    }
  });
}
navigateToHome(){
      this.router.navigate(['/home']);
  }

}
