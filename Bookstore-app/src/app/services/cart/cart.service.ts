import { Injectable } from '@angular/core';
import { HttpService } from '../http_service/http-service.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCount = new Subject<number>();

  constructor(private http: HttpService) {}

  getCartCountObservable() {
    return this.cartCount.asObservable();
  }

  updateCartCount() {
    this.getCartItems().subscribe((res: any) => {
      this.cartCount.next(res.result.length);
    });
  }

  addToCart(productId: string): Observable<any> {
    return this.http.postApi(`add_cart_item/${productId}`, {}, this.http.getHeader());
  }
  removeCartItem(cartItemId: string): Observable<any> {
    return this.http.deleteApi(`remove_cart_item/${cartItemId}`, this.http.getHeader());
  }

 updateQuantity(cartItemId: string, quantity: number): Observable<any> {
  return this.http.putApi(
    `cart_item_quantity/${cartItemId}`,
    { quantityToBuy: quantity },
    this.http.getHeader()
  );
}

  getCartItems(): Observable<any> {
    return this.http.getApi('get_cart_items', this.http.getHeader());
  }
  placeOrder(payload: any): Observable<any> {
  return this.http.postApi('add/order', payload, this.http.getHeader());
}
}
