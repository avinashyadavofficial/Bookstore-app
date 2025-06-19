import { Injectable } from '@angular/core';
import { HttpService } from '../http_service/http-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpService) { }
  

  login(payload: any): Observable<any> {
    return this.http.postApi('login', payload);
  }

  register(payload: any):Observable<any>{
    return this.http.postApi('registration', payload);
  }
}