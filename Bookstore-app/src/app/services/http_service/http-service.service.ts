import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = 'https://bookstore.incubation.bridgelabz.com/bookstore_user/';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getHeader(): HttpHeaders {
    let token = '';
    if (this.isBrowser) {
      token = localStorage.getItem('authToken') || '';
    }
    return new HttpHeaders({ Authorization: token });
  }

  getApi(endpoint: string, headers: HttpHeaders = this.getHeader()) {
    return this.http.get(this.baseUrl + endpoint, { headers });
  }

  postApi(endpoint: string, payload: any, headers: HttpHeaders = this.getHeader()) {
    return this.http.post(this.baseUrl + endpoint, payload, { headers });
  }
  putApi(endpoint: string, payload: any, headers: HttpHeaders = this.getHeader()) {
    return this.http.post(this.baseUrl + endpoint, payload, { headers });
  }
}
