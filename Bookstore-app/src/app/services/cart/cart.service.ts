import { Injectable } from '@angular/core';
import { HttpService } from '../http_service/http-service.service';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCount = new Subject<number>();

  constructor(private http: HttpService) {}

  getCartCountObservable(): Observable<number> {
    return this.cartCount.asObservable();
  }

 updateCartCount() {
  this.getCartItems().subscribe((res: any) => {
    const totalItems = res.result.reduce((sum: number, item: any) => {
      return sum + (item.quantityToBuy || 1);
    }, 0);
    this.cartCount.next(totalItems); // ✅ Now sets correct total quantity to topbar
  });
}



  addToCart(productId: string): Observable<any> {
    const headers = this.http.getHeader();
    return this.http.postApi(`add_cart_item/${productId}`, {}, headers);
  }

  removeCartItem(cartItemId: string): Observable<any> {
    const headers = this.http.getHeader();
    return this.http.deleteApi(`remove_cart_item/${cartItemId}`, headers);
  }

  updateQuantity(cartItemId: string, quantity: number): Observable<any> {
    if (!cartItemId || quantity < 1) {
      console.warn("Invalid updateQuantity request:", { cartItemId, quantity });
      return of(null); // Return empty observable
    }

    const headers = this.http.getHeader();
    return this.http.putApi(
      `cart_item_quantity/${cartItemId}`,
      { quantityToBuy: quantity },
      headers
    );
  }

  getCartItems(): Observable<any> {
    const headers = this.http.getHeader();
    return this.http.getApi('get_cart_items', headers);
  }

  placeOrder(payload: any): Observable<any> {
    const headers = this.http.getHeader();
    return this.http.postApi('add/order', payload, headers);
  }
}
