import { TestBed } from '@angular/core/testing';
import { WishlistService } from './wishlist.service';
import { HttpService } from '../http_service/http-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WishlistService', () => {
  let service: WishlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [WishlistService, HttpService] 
    });
    service = TestBed.inject(WishlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
