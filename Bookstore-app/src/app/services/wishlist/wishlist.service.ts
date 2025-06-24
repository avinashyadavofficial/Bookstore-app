import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http_service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private http: HttpService) {}

  getWishlist(): Observable<any> {
    return this.http.getApi('get_wishlist_items', this.http.getHeader());
  }

  addWishlist(productId: string): Observable<any> {
    return this.http.postApi(`add_wish_list/${productId}`, {}, this.http.getHeader());
  }


  removeWishlist(productId: string): Observable<any> {
    return this.http.deleteApi(`remove_wishlist_item/${productId}`, this.http.getHeader());
  }
}
