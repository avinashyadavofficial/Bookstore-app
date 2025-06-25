import { Injectable } from '@angular/core';
import { HttpService } from '../http_service/http-service.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpService) {}

  getBooks(): Observable<any> {
    return this.http.getApi('get/book',  this.http.getHeader());
  }
  
}
