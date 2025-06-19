import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = 'https://bookstore.incubation.bridgelabz.com/bookstore_user/';

  constructor(private http: HttpClient) {}

  getHeader() {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem('authToken') || ''
    });
    return headers;
  }

  getApi(endpoint: string, headers: HttpHeaders = new HttpHeaders()) {
    return this.http.get(this.baseUrl + endpoint, { headers });
  }

  postApi(endpoint: string, payload: any, headers: HttpHeaders = new HttpHeaders()) {
    return this.http.post(this.baseUrl + endpoint, payload, { headers });
  }
}
